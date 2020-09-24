Application Configuration
=========================

In the ``mapstore`` directory inside the configuration dir of geOrchestra you may find several files dedicated to the configuration of various parts of MapStore.

Printing
^^^^^^^^
In the ``mapstore`` directory ``printing`` is dedicated to the setup of the mapstore printing module, included in geOrchestra by default.
More information about how to configure these files is available `here <https://mapstore.readthedocs.io/en/latest/developer-guide/printing-module/#print-settings>`__.

Proxy
^^^^^
MapStore brings an internal secure proxy to give support request to external services (WMS, WMTS ...).
The file ``proxy.properties`` contains all the configuration for this file.
More information about configuring this file is available `here <https://github.com/geosolutions-it/http-proxy/wiki/Configuring-Http-Proxy>`__.

Map Viewer Settings
^^^^^^^^^^^^^^^^^^^
To configure the map viewer, there are several files dedicated to different parts of the application.
If some of these files are not present the application will take automatically the files from the original `mapstore` webapp.

* ``localConfig.json``: main frontend configuration file, in JSON format (see `here <https://mapstore.readthedocs.io/en/latest/developer-guide/local-config/>`__)
* ``config.json``: map configuration file for initial viewer map (see `here <https://mapstore.readthedocs.io/en/latest/developer-guide/maps-configuration/#map-options>`__ for the format of this file).
* ``new.json``: map configuration file for new maps (see `here <https://mapstore.readthedocs.io/en/latest/developer-guide/maps-configuration/#map-options>`__ for the format of this file).
* ``pluginsConfig.json``: dynamic registry of available plugins (both standard and extensions) for the context editor, in JSON format

Read/Write configuration dir and patch files
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Configuration files with plugins like ``localConfig.json`` and p``pluginsConfig.json`` may change a lot from one update to another.
Moreover MapStore may need to change configurations when you install an extension. To support both updates and changes applied from the UI and maintain support to manual editing,
MapStore provides a system of cascading patch application and default file loading for these files.

**Patch files**

In the data directory you may add or find some ``.patch`` files. These files contain changes to apply to the default files. This system helps to wrap some modifications applied manually or coming from the application (e.g. extension installation) keeping the original file untouched.
( see `here <https://mapstore.readthedocs.io/en/latest/developer-guide/externalized-configuration/#patching-front-end-configuration>`__ for more information about patching system in MapStore).

**Multiple data directory:**
In particular you can configure more then one ``georchestra.datadir`` values, separated by comma. (see `here <https://mapstore.readthedocs.io/en/latest/developer-guide/externalized-configuration/#multiple-data-directory-locations>`_ for specific MapStore implementation details about this part).

* The files will be searched in cascade in each directory of the ones listed.
* The application will write only in the first directory.

geOrchestra can be configured to have a **write** and a **read** configuration directory.

Dynamic Files / patch files
^^^^^^^^^^^^^^^^^^^^^^^^^^^
From the MapStore allows to install plugins. When a new plugin is installed, several files will appear be written in the data-directory.

* ``extensions.json``: dynamic registry of currently installed extensions, in JSON format
* ``dist`` subfolder: will contain all the dynamically uploaded extensions, one folder for each of them, with all the extension assets (javascript bundle, translations, etc.)
* ``pluginsConfig.json.patch``: a **patch** file for new plugins installed from the UI.




