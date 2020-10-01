Database Configuration
======================
MapStore uses the geOrchestra PostgreSQL database to store resources saved by the application (maps, contexts, etc.).
A specific schema, called ``mapstore``, is used for this purpose.
The schema can be created / populated using the SQL scripts in the source code database folder `here <https://github.com/georchestra/mapstore2-georchestra/tree/master/database/>`_.

The database connection settings are taken from the geOrchestra ``default.properties`` configuration file, and mapped to
internal configuration variables (using for instance ``${pgsqlHost}``, etc...).

Overriding Database configuration for MapStore
----------------------------------------------

In ``mapstore/geostore.properties`` there is a dedicated configuration file that contains the settings that can not be loaded from ``default.properties``.
It contains only one setting that indicates the database schema to use for MapStore.

 * ``pgsqlGeoStoreSchema``: schema used for the MapStore database (Defaults to ``mapstore``)

This file can be used to override connection parameters defined in ``default.properties``, to configure MapStore in a different way from the rest of the infrastructure.
