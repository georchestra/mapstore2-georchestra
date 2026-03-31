# General Configuration Principles

MapStore uses the standard geOrchestra environment variable `georchestra.datadir` to locate the `default.properties` file and load shared infrastructure settings such as database and LDAP connection parameters.

MapStore also enables its own data directory under `georchestra.datadir/mapstore`. This dedicated subdirectory contains the files used to customize the application beyond the shared geOrchestra defaults.
