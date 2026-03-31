# Application Configuration

The `mapstore/` folder inside the geOrchestra configuration directory contains the files used to configure backend services and the frontend viewer.

## Backend services

MapStore embeds backend services for functions such as printing and proxying external services.

### Printing

The `mapstore/printing/` directory contains the configuration of the printing module. This module extends MapFish Print v2 with MapStore-specific customizations.

More details are available in the upstream MapStore documentation:

- [Printing module settings](https://mapstore.readthedocs.io/en/latest/developer-guide/printing-module/#print-settings)

### Proxy

MapStore includes an internal secure proxy used to access external services such as WMS or WMTS endpoints.

The `proxy.properties` file contains the proxy configuration. See:

- [Configuring Http Proxy](https://github.com/geosolutions-it/http-proxy/wiki/Configuring-Http-Proxy)

## Map viewer

The map viewer, plugin registry and context editor are configured through JSON files stored in `mapstore/`. If a file is missing from the data directory, MapStore falls back to the version bundled in the original webapp.

### `localConfig.json`

Main frontend configuration file. It defines the viewer setup, the list of enabled plugins and the tools available in administration pages.

Reference:

- [Local config](https://mapstore.readthedocs.io/en/latest/developer-guide/local-config/)

### `config.json`

Default map configuration, including initial extent and default layers such as base maps.

Reference:

- [Map options](https://mapstore.readthedocs.io/en/latest/developer-guide/maps-configuration/#map-options)

### `new.json`

Initial map definition used when creating a new context in the context editor.

Reference:

- [Map options](https://mapstore.readthedocs.io/en/latest/developer-guide/maps-configuration/#map-options)

### `pluginsConfig.json`

Registry of the available plugins in JSON format. It controls the list of plugins that can be selected in the context editor.

Reference:

- [Context editor config](https://mapstore.readthedocs.io/en/latest/developer-guide/context-editor-config/)

## Advanced map viewer behavior

### Patch files

Files such as `localConfig.json` and `pluginsConfig.json` evolve frequently across versions. To keep local changes isolated from upstream defaults, MapStore supports `.patch` files that contain only the differences to apply.

The final configuration is assembled dynamically by the application when the file is requested over HTTP.

Reference:

- [Patching front-end configuration](https://mapstore.readthedocs.io/en/latest/developer-guide/externalized-configuration/#patching-front-end-configuration)

### Dynamic files

When extensions are installed from the administration UI, MapStore writes additional files to the data directory:

- `extensions.json`: JSON registry of installed extensions
- `dist/`: assets for uploaded extensions
- `pluginsConfig.json.patch`: patch file reflecting plugin additions

To store these files elsewhere, define the JVM option `georchestra.extensions`. If not set, MapStore stores them in the standard configuration directory.

### Multiple configuration directories

MapStore can read from multiple configuration directories by setting several comma-separated values in `georchestra.datadir`.

The rules are:

- reads use the first matching file found in the declared order
- writes always target only the first directory

This makes it possible to combine a writable directory managed by the application with one or more read-only directories maintained manually by administrators.
