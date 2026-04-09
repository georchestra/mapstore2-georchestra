# Configuration Guide

MapStore2 for geOrchestra can be configured through the [geOrchestra data directory](https://github.com/georchestra/datadir).

The base database and LDAP settings are usually provided by `default.properties` at the root of the configured data directory. MapStore-specific files live in the `mapstore/` subdirectory and cover backend services, frontend JSON configuration and advanced runtime behavior.

This section explains:

- the generic role of `georchestra.datadir`
- database-specific settings
- application configuration files stored under `mapstore/`
- integration details and fallback behavior
