# Database Configuration

MapStore uses the geOrchestra PostgreSQL database to store application resources such as maps and contexts. A dedicated schema named `mapstore` is used for this data.

The schema can be created and populated using the SQL scripts provided in the repository [`database/`](https://github.com/georchestra/mapstore2-georchestra/tree/master/database/).

## Connection settings

Connection parameters are usually inherited from geOrchestra `default.properties` and mapped internally to variables such as `${pgsqlHost}`.

## Overriding MapStore database settings

`mapstore/geostore.properties` contains settings that are specific to MapStore and cannot be read directly from `default.properties`.

The main property is:

- `pgsqlGeoStoreSchema`: schema used by MapStore, defaulting to `mapstore`

This file can also be used to override connection parameters when MapStore must use database settings different from the rest of the platform.
