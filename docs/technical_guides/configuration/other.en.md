# Other Configuration Notes

## Integration with the geOrchestra data directory

MapStore can be configured through the [geOrchestra data directory](https://github.com/georchestra/datadir), using the same externalized configuration mechanisms as upstream MapStore.

If the data directory is not configured, the application uses its built-in defaults. If the data directory is configured but some files are missing, MapStore falls back to the files bundled in the deployed webapp.

This behavior is useful because it lets administrators customize only what is needed while keeping upgrades simpler.

The main recommendation is:

- copy a configuration file to the data directory only when you really need to customize it

This is especially important for `localConfig.json`, because keeping a fully copied version means new plugins introduced by future releases must be merged manually.

## Header configuration

MapStore embeds the geOrchestra header on top of the viewer pages.

The following properties are read from `default.properties`:

- `headerHeight`: height of the header application, default `90px`
- `headerUrl`: URL of the header application, default `/header/`

The location of `default.properties` is resolved through the standard `georchestra.datadir` setting. For local development, the JVM option typically looks like:

```console
-Dgeorchestra.datadir=/etc/georchestra
```
