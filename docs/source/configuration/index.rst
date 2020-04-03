Configuration Guide
===================

geOrchestra MapStore can be configured using the `geOrchestra configuration directory <https://github.com/georchestra/datadir>`_.

The configuration directory is enabled through the MapStore datadir functionality. For more information
on this, please look at the official MapStore documentation `here <https://mapstore.readthedocs.io/en/latest/developer-guide/externalized-configuration/>`_

geOrchestra MapStore enables the MapStore datadir and in addition, uses the standard geOrchestra default.properties file
from the geOrchestra configuration directory to inherit all the shared configuration (e.g. the database
connection settings, LDAP connection settings and so on).

More in detail:

 * a lot of shared configuration properties are read from the geOrchestra default.properties file
 * a MapStore subfolder contains MapStore specific configuration files:

   * geostore.properties: MapStore specific database configuration properties (not contained in default.properties, e.g. the database schema used by MapStore for its persistence layer)
   * proxy.properties: MapStore proxy configuration (see here: https://github.com/geosolutions-it/http-proxy/wiki/Configuring-Http-Proxy)   for further details)
   * log4j.properties: logging configuration (see here: https://logging.apache.org/log4j/2.x/manual/configuration.html#ConfigurationSyntax>)
   * localConfig.json: main frontend configuration file, in JSON format (see here: https://mapstore.readthedocs.io/en/latest/developer-guide/local-config/)
   * extensions.json: dynamic registry of currently installed extensions, in JSON format
   * pluginsConfig.json: dynamic registry of available plugins (both standard and extensions) for the context configurator, in JSON format
   * printing: folder with mapfish-print configuration files, config.yaml and related resource (see here: https://github.com/geosolutions-it/mapfish-print/wiki>)
   * dist subfolder: will contain all the dynamically uploaded extensions, one folder for each of them, with all the extension assets (javascript bundle, translations, etc.)

If the datadir is not configured / used in a particular environment, default configurations will be applied.

If the datadir is configured, but some of the above mentioned files are missing from it, a default fallback will
be used.

This allows the administrator to find a good compromise between two conflicting needs:
 * customizing your geOrchestra MapStore installation
 * allow an easy upgrade to newer versions

It is important to understand that if a configuration file is loaded from the datadir, it will not be
upgraded when a new version of the application is installed, and any necessary upgrades should be done manually.
So, our advice is: put a configuration file in the datadir only if it is dynamically changed from the application or
you need to customize it.

Dynamic files are for example:
 * extensions.json
 * pluginsConfig.json
 * the dist subfolder

These files are updated by the extensions upload functionality, so they have to be put in the datadir, or they will be
removed at every application update.

All the other files should be put in the datadir only if you need to customize them.
A particular attention is needed for localConfig.json: this is where the available MapStore plugins are registered, so,
if you copied it in the datadir, you will need to manually add new plugins when you upgrade to a new version.

More details about configuration aspects can be found in the following sections:

.. toctree::
   :maxdepth: 4

   ../database/index
   ../security/index
   ../header/index


