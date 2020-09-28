Other Configurations
====================

This section contains some other miscellaneous information and configurations that are available for MapStore.

General information about integration between MapStore and geOrchestra
----------------------------------------------------------------------

geOrchestra MapStore can be configured using the `geOrchestra configuration directory <https://github.com/georchestra/datadir>`_.

The configuration directory is enabled through the MapStore data-dir functionality. For more information
on this, please look at the official MapStore documentation `here <https://mapstore.readthedocs.io/en/latest/developer-guide/externalized-configuration/>`_

If the datadir is not configured / used in a particular environment, default configurations will be applied.
If the datadir is configured, but some of the above mentioned files are missing from it, a default fallback will
be used. The fallback will look for files in the web application root folder (webapps/mapstore), so the configurations
from the original MapStore war file will be used.

This allows the administrator to find a good compromise between two conflicting needs:
 * customizing your geOrchestra MapStore installation
 * allow an easy upgrade to newer versions

It is important to understand that if a configuration file is loaded from the datadir, it will not be
upgraded when a new version of the application is installed, and any necessary upgrades should be done manually.

**So, our advice is**: put a configuration file in the datadir only if you need to customize it.
A particular attention is needed for ``localConfig.json``: this is where the available MapStore plugins are registered, so,
if you copied it in the datadir, you will need to manually add new plugins when you upgrade to a new version.


Header Configuration
--------------------

MapStore includes the geOrchestra header application on top of the map viewer pages.

Some configuration properties for the header are taken from the  geOrchestra ``default.properties`` configuration file.

In particular the following are used:

 * ``headerHeight``: height of the header app (Defaults to 90px)
 * ``headerUrl``: url of the header app (Defaults to /header/)

To configure the ``default.properties`` location the default georchestra environment variable is used (``georchestra.datadir``).
For local development, this must be configured for the JVM:

 .. code-block:: console

    -Dgeorchestra.datadir=/etc/georchestra
