Configuration Guide
===================

geOrchestra MapStore can be configured using the `geOrchestra configuration directory <https://github.com/georchestra/datadir>`_.

All basic configurations for the database are already configured and loaded from the ``default.properties`` file inside the root of the configuration directory.

The configuration directory sub-folder ``mapstore``, dedicated to MapStore, contains several files dedicated to basic settings, integration with geOrchestra, application configuration and advanced setup.

In this documentation you will learn how to configure in detail the ``default.properties`` entries and the files in the ``mapstore`` folder.

General
-------
To configure the ``default.properties`` location the default georchestra environment variable is used (``georchestra.datadir``).

geOrchestra MapStore enables the MapStore datadir and in addition, uses the standard geOrchestra ``default.properties`` file
from the geOrchestra configuration directory to inherit all the shared configuration (e.g. the database
connection settings, LDAP connection settings and so on).

.. toctree::
   :maxdepth: 4

   ./database/index
   ./application/index
   ./other/index


