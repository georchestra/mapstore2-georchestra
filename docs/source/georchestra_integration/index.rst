MapStore Integration in geOrchestra
====================================
This section describes how to include MapStore in your geOrchestra installation.

All the steps assumes you are working from the project main directory.

Edit docker-compose.yml
^^^^^^^^^^^^^^^^^^^^^^^
Add the following snippet to the docker-compose.yml file:

 .. code-block:: text

    mapstore:
    image: geosolutionsit/mapstore2-georchestra:latest
    depends_on:
      - database
    volumes:
      - ./config:/etc/georchestra
    environment:
      - JAVA_OPTS=-Xms512m -Xmx512m -XX:MaxPermSize=128m -Dgeostore-ovr=file:///etc/georchestra/mapstore/geostore-datasource-ovr.properties

Configure the ’proxy’ container to forward requests to mapstore
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Add the following to the config/security-proxy/targets-mapping.properties file:

 .. code-block:: text

    analytics=http://analytics:8080/analytics/
    atlas=http://atlas:8080/atlas/
    console=http://console:8080/console/
    extractorapp=http://extractorapp:8080/extractorapp/
    geonetwork=http://geonetwork:8080/geonetwork/
    geoserver=http://geoserver:8080/geoserver/
    header=http://header:8080/header/
    mapfishapp=http://mapfishapp:8080/mapfishapp/
    mapstore=http://mapstore:8080/mapstore/

Create config directory for mapstore
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

 .. code-block:: console

    mkdir config/mapstore/

Add geostore override file to user PostgreSQL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Create the config/mapstore/geostore-datasource-ovr.properties with the following content:

 .. code-block:: text

    #Default Postgres Connection values, uncomment for using postgres
    geostoreDataSource.driverClassName=org.postgresql.Driver
    geostoreDataSource.url=jdbc:postgresql://database:5432/geostore
    geostoreDataSource.username=geostore
    geostoreDataSource.password=geostore
    geostoreVendorAdapter.databasePlatform=org.hibernate.dialect.PostgreSQLDialect
    geostoreEntityManagerFactory.jpaPropertyMap[hibernate.hbm2ddl.auto]=validate
    geostoreEntityManagerFactory.jpaPropertyMap[hibernate.default_schema]=geostore
    geostoreVendorAdapter.generateDdl=true
    geostoreVendorAdapter.showSql=false

NOTE: update the values to match your environment

Setup Database
^^^^^^^^^^^^^^

1. Jump into the PostgreSQL container and create GeoStore Role and DB

 .. code-block:: console

    docker exec -it docker_database_1 bash
    su postgres
    psql -U georchestra
    CREATE ROLE geostore WITH LOGIN PASSWORD 'geostore';
    CREATE DATABASE geostore WITH OWNER 'geostore';

2. Create schemas and tables as per `GeoStore documentation <https://github.com/geosolutions-it/geostore/tree/master/doc>`_

Recreate MapStore Container to pick up the change
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

 .. code-block:: console

    docker-compose up -d --force-recreate mapstore

Update “header” application index to link to Mapstore
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Extract the "header" application war from the docker image

 .. code-block:: console

    docker cp docker_header_1:/var/lib/jetty/webapps/header.war ./header.war

2. In the war file, update the WEB-INF/classes/_header/i18n/index_en.properties file adding the following:

 .. code-block:: text

    mapstore=mapstore

3. In the war file, update the WEB-INF/jsp/index.jsp file adding the following:

 .. code-block:: xml

    <c:choose>
        <c:when test='<%= active.equals("mapstore") %>'>
        <li class="active"><a><fmt:message key="mapstore"/></a></li>
        </c:when>
        <c:otherwise>
        <li><a href="/mapstore/"><fmt:message key="mapstore"/></a></li>
        </c:otherwise>
    </c:choose>

4. In the war file, update the WEB-INF/jsp/index.jsp file with the following:

 .. code-block:: java

    ...
    Boolean extractorappadmin = false;
    Boolean msadmin = false;
    String sec_roles = request.getHeader("sec-roles");
    if(sec_roles != null) {
        String[] roles = sec_roles.split(";");
        for (int i = 0; i < roles.length; i++) {
            if (roles[i].equals("ROLE_GN_EDITOR") || roles[i].equals("ROLE_GN_REVIEWER") || roles[i].equals("ROLE_GN_ADMIN") || roles[i].equals("ROLE_ADMINISTRATOR") || roles[i].equals("ROLE_USER")) {
                anonymous = false;
            }
            if (roles[i].equals("ROLE_SUPERUSER")) {
                admin = true;
                console = true;
            }
            if (roles[i].equals("ROLE_ORGADMIN")) {
                admin = true;
                console = true;
            }
            if (roles[i].equals("ROLE_GN_ADMIN")) {
                admin = true;
                catadmin = true;
            }
            if (roles[i].equals("ROLE_ADMINISTRATOR")) {
                admin = true;
                extractorappadmin = true;
            }
            if (roles[i].equals("ROLE_MAPSTORE_ADMIN")) {
                admin = true;
                msadmin = true;
            }
        }
    }
    ...

5. In the war file, update the WEB-INF/jsp/index.jsp file adding the following:

 .. code-block:: xml

    <c:choose>
        <c:when test='<%= msadmin == true %>'>
        <c:choose>
            <c:when test='<%= active.equals("msadmin") %>'>
        <li class="active"><a><fmt:message key="mapstore"/></a></li>
            </c:when>
            <c:otherwise>
        <li><a href="/mapstore/#/admin"><fmt:message key="mapstore"/></a></li>
            </c:otherwise>
        </c:choose>
        </c:when>
    </c:choose>

6. Finally put the edited war back to the container:

 .. code-block:: console

    docker cp header.war docker_header_1:/var/lib/jetty/webapps/header.war

