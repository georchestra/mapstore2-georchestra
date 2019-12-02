Configuration Guide
===================

GeOrchestra MapStore can be configuring using `GeOrchestra configuration directory <https://github.com/georchestra/datadir>`_.
In particular:

 * a lot of shared configuration properties are read from the GeOrchestra default.properties file
 * a mapstore subfolder contains MapStore specific configuration files:

   * geostore.properties: MapStore specific database configuration properties
   * proxy.properties: MapStore proxy configuration (see here: https://github.com/geosolutions-it/http-proxy/wiki/Configuring-Http-Proxy)   for further details)
   * log4j.properties: logging configuration (see here: https://logging.apache.org/log4j/2.x/manual/configuration.html#ConfigurationSyntax>)
   * localConfig.json: main frontend configuration file, in JSON format (see here: https://mapstore.readthedocs.io/en/latest/developer-guide/local-config/)
   * printing: folder with mapfish-print configuration files, config.yaml and related resource (see here: https://github.com/geosolutions-it/mapfish-print/wiki>)

If the datadir is not configured / used in a particular environment, default configurations will be applied.



More details about configuration aspects can be found in the following sections:

.. toctree::
   :maxdepth: 4

   ../database/index
   ../security/index
   ../header/index

 