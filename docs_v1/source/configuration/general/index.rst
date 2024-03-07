General
-------
MapStore uses the default geOrchestra environment variable ``georchestra.datadir`` to identify the ``default.properties`` file location and uses it for it's basic configurations (e.g. the database
connection settings, LDAP connection settings and so on).

Moreover, MapStore enables it's own datadir inside the ``georchestra.datadir`` sub-folder called ``mapstore``, to handle it's own configuration files.

