Database Configuration
======================
MapStore uses the geOrchestra PostgreSQL database to store resources saved by the application (maps, contexts, etc.).
A specific schema, called geostore, is used for this purpose.
The schema can be created / populated using the SQL scripts in the source code database folder `here <https://github.com/georchestra/mapstore2-georchestra/tree/master/database/>`_.

The database connection settings are taken from the geOrchestra default.properties configuration file, and mapped to
internal configuration variables (e.g. ${pgsqlHost}).

To configure the default.properties location the default georchestra environment variable is used (georchestra.datadir).
For local development, this must be configured for the JVM:

 .. code-block:: console

    -Dgeorchestra.datadir=/etc/georchestra
