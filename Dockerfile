FROM alpine:latest as extractwar
RUN apk --no-cache add unzip
WORKDIR /tmp
COPY docker/MapStore-*.war mapstore.war
RUN unzip mapstore.war -d mapstore

#9-jdk11 uses temurin 11.0.27 and not openjdk 11.0.16
FROM tomcat:9-jdk11
MAINTAINER geosolutions<info@geo-solutions.it>

RUN mkdir -p /docker-entrypoint.d
# Tomcat specific options
ENV CATALINA_BASE "$CATALINA_HOME"
ENV JAVA_OPTS="${JAVA_OPTS} -XX:MaxRAMPercentage=80 -XX:+UseParallelGC ${JAVA_OPTIONS}"

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
# SHould be override in 2024.xx when a server.xml on 8080 will be available
COPY --chown=tomcat:tomcat docker/server.xml "${CATALINA_BASE}/conf/"
USER tomcat

# Geostore externalization template. Disabled by default
# COPY docker/geostore-datasource-ovr.properties "${CATALINA_BASE}/conf/"
# ARG GEOSTORE_OVR_OPT=""
ARG GEORCHESTRA_DATADIR_OPT="-Dgeorchestra.datadir=/etc/georchestra"
ENV JAVA_OPTS="${JAVA_OPTS} ${GEORCHESTRA_DATADIR_OPT}"

# Set variable to better handle terminal commands
ENV TERM xterm

# Necessary to execute tomcat and custom scripts
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["catalina.sh", "run"]

EXPOSE 8080

# OCI image labels (https://github.com/opencontainers/image-spec/blob/main/annotations.md)
LABEL org.opencontainers.image.title="MapStore for geOrchestra"
LABEL org.opencontainers.image.description="MapStore integration for the geOrchestra SDI"
LABEL org.opencontainers.image.vendor="geOrchestra"
LABEL org.opencontainers.image.licenses="GPL-3.0"
LABEL org.opencontainers.image.url="https://www.georchestra.org/"
LABEL org.opencontainers.image.documentation="https://docs.georchestra.org/"
LABEL org.opencontainers.image.source="https://github.com/georchestra/mapstore2-georchestra"
