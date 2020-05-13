Database Configuration
======================
MapStore uses the geOrchestra PostgreSQL database to store resources saved by the application (maps, contexts, etc.).
A specific schema, called geostore, is used for this purpose.
The schema can be created / populated using the SQL scripts in the source code database folder `here <https://github.com/georchestra/mapstore2-georchestra/tree/master/database/>`_.

The database connection settings are taken from the geOrchestra default.properties configuration file, and mapped to
internal configuration variables (e.g. ${pgsqlHost}).

In addition to that a geostore.properties file in datadir/mapstore is used for MapStore specific settings:

 * pgsqlGeoStoreSchema: schema used for the MapStore permissions database (Defaults to geostore)

Notice that you can also override other connection properties that are configured in default.properties, by
putting them in geostore.properties. All the properties that can be overridden are commented in the datadir geostore.properties
file, so you can just uncomment them and set the desired value.

To configure the default.properties location the default georchestra environment variable is used (georchestra.datadir).
For local development, this must be configured for the JVM:

 .. code-block:: console

    -Dgeorchestra.datadir=/etc/georchestra
