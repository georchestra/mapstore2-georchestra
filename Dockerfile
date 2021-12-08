FROM tomcat:7.0-jre8
MAINTAINER geosolutions<info@geo-solutions.it>

# Tomcat specific options
ENV CATALINA_BASE "$CATALINA_HOME"
ENV JAVA_OPTS="${JAVA_OPTS}  -Xms512m -Xmx512m -XX:MaxPermSize=128m"

# Optionally remove Tomcat manager, docs, and examples
ARG TOMCAT_EXTRAS=false
RUN if [ "$TOMCAT_EXTRAS" = false ]; then \
      find "${CATALINA_BASE}/webapps/" -delete; \
    fi

# Create a non-privileged tomcat user
RUN addgroup --gid 999 tomcat && \
    adduser --system  -u 999 --gid 999 --no-create-home tomcat && \
    chown -R 999:999 /usr/local/tomcat

# Add war files to be deployed
COPY --chown=999:999 web/target/mapstore.war "${CATALINA_BASE}/webapps/mapstore.war"

# Geostore externalization template. Disabled by default
# COPY docker/geostore-datasource-ovr.properties "${CATALINA_BASE}/conf/"
# ARG GEOSTORE_OVR_OPT=""
ARG GEORCHESTRA_DATADIR_OPT="-Dgeorchestra.datadir=/etc/georchestra"
ENV JAVA_OPTS="${JAVA_OPTS} ${GEORCHESTRA_DATADIR_OPT}"

# Set variable to better handle terminal commands
ENV TERM xterm

USER tomcat

EXPOSE 8080
