FROM jetty:9-jre11
LABEL maintainers="geosolutions<info@geo-solutions.it>, geOrchestra<psc@georchestra.org>"

RUN java -jar "$JETTY_HOME/start.jar" --create-startd --add-to-start=jmx,jmx-remote,stats,http-forwarded

# Add war files to be deployed
COPY web/target/*.war /var/lib/jetty/webapps/

# Geostore externalization template. Disabled by default
# COPY docker/geostore-datasource-ovr.properties "/var/lib/jetty/conf/"
# ARG GEOSTORE_OVR_OPT=""
# georchestra datadir is defaulted to /etc/georchestra
# might be overriden with -Dgeorchestra.datadir=/etc/georchestra
# ARG GEORCHESTRA_DATADIR_OPT="-Dgeorchestra.datadir=/etc/georchestra"

# This is usually overriden in the docker-compose
ENV JAVA_OPTIONS="-Xms512m -Xmx512m -DPRINT_BASE_URL=pdf -Dgeorchestra.datadir=/etc/georchestra"

