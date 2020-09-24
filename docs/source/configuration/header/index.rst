Header Configuration
====================
MapStore includes the geOrchestra header application on top of the map viewer pages.

Some configuration properties for the header are taken from the  geOrchestra ``default.properties`` configuration file.

In particular the following are used:

 * ``headerHeight``: height of the header app (Defaults to 90px)
 * ``headerUrl``: url of the header app (Defaults to /header/)

To configure the ``default.properties`` location the default georchestra environment variable is used (``georchestra.datadir``).
For local development, this must be configured for the JVM:

 .. code-block:: console

    -Dgeorchestra.datadir=/etc/georchestra
