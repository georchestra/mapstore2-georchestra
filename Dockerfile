FROM alpine:latest as alpine
RUN apk --update add unzip && rm -rf /var/cache/apk/*
WORKDIR /tmp
COPY docker/MapStore-*.war mapstore.war
RUN unzip mapstore.war -d mapstore


FROM tomcat:9-jdk11-openjdk
MAINTAINER geosolutions<info@geo-solutions.it>

# Tomcat specific options
ENV CATALINA_BASE "$CATALINA_HOME"
ENV JAVA_OPTS="${JAVA_OPTS}  -Xms512m -Xmx512m -XX:MaxPermSize=128m"

# Optionally remove Tomcat manager, docs, and examples
ARG TOMCAT_EXTRAS=false
RUN if [ "$TOMCAT_EXTRAS" = false ]; then \
      find "${CATALINA_BASE}/webapps/" -delete; \
    fi

# Add application from first stage
COPY --from=alpine /tmp/mapstore "${CATALINA_BASE}/webapps/mapstore"

# Geostore externalization template. Disabled by default
# COPY docker/geostore-datasource-ovr.properties "${CATALINA_BASE}/conf/"
# ARG GEOSTORE_OVR_OPT=""
ARG GEORCHESTRA_DATADIR_OPT="-Dgeorchestra.datadir=/etc/georchestra"
ENV JAVA_OPTS="${JAVA_OPTS} ${GEORCHESTRA_DATADIR_OPT}"

# Set variable to better handle terminal commands
ENV TERM xterm

EXPOSE 8080
