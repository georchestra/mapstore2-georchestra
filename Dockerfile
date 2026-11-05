FROM alpine:3.23 AS extractwar
RUN apk --no-cache add unzip
WORKDIR /tmp
COPY docker/MapStore-*.war mapstore.war
RUN unzip mapstore.war -d mapstore

FROM tomcat:11.0-jdk17-temurin-resolute
LABEL maintainer="geosolutions<info@geo-solutions.it>"

RUN mkdir -p /docker-entrypoint.d
# Tomcat specific options
ENV CATALINA_BASE="$CATALINA_HOME"
ENV JAVA_OPTS="-XX:MaxRAMPercentage=80 -XX:+UseParallelGC"

# Optionally remove Tomcat manager, docs, and examples
ARG TOMCAT_EXTRAS=false
RUN if [ "$TOMCAT_EXTRAS" = false ]; then \
      find "${CATALINA_BASE}/webapps/" -delete; \
    fi

# Create a non-privileged tomcat user
ARG USER_GID=999
ARG USER_UID=999
RUN addgroup --gid ${USER_GID} tomcat && \
    adduser --system  -u ${USER_UID} --gid ${USER_GID} --no-create-home tomcat && \
    chown -R tomcat:tomcat ${CATALINA_BASE}/ && \
    chown tomcat:tomcat /docker-entrypoint.d

# Add application from first stage
COPY --chown=tomcat:tomcat --from=extractwar /tmp/mapstore "${CATALINA_BASE}/webapps/mapstore"
COPY --chown=tomcat:tomcat georchestra-docker-scripts/ /
# Application connector, including compression previously provided by ehcache-web.
COPY --chown=tomcat:tomcat docker/server.xml "${CATALINA_BASE}/conf/"
USER tomcat

# Geostore externalization template. Disabled by default
# COPY docker/geostore-datasource-ovr.properties "${CATALINA_BASE}/conf/"
# ARG GEOSTORE_OVR_OPT=""
ARG GEORCHESTRA_DATADIR_OPT="-Dgeorchestra.datadir=/etc/georchestra"
ENV JAVA_OPTS="${JAVA_OPTS} ${GEORCHESTRA_DATADIR_OPT}"

# Set variable to better handle terminal commands
ENV TERM=xterm

# Necessary to execute tomcat and custom scripts
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["catalina.sh", "run"]

EXPOSE 8080