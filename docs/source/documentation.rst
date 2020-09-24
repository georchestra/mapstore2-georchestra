
Documentation Guide
===================

General
^^^^^^^
This documentation uses `Sphinx`_. In this section you will find out how to build and localize this documentation.

.. _Sphinx: https://www.sphinx-doc.org/

It is configured to be deployed in multi-language environment using `read the docs <https://readthedocs.org>`_.

.. _ readthedocs.org: https://readthedocs.org

Requirements
^^^^^^^^^^^^

To build the documentation you need:

 * ``python`` and ``pip`` installed
 * ``make`` installed. You can install it using `sudo apt-get install build-essential` on linux.
 * You will need also to install these extensions, using `pip`

.. code-block:: console

    pip install sphinx
    pip install sphinx_rdt_theme
    pip install recommonmark

Building
^^^^^^^^
The main build, multi-language, is made by readthedocs.org. You can build the documentation **in english**, locally for testing, you can run:

.. code-block:: console

    cd docs # change directory in docs folder
    make html # builds html version of the documentation


See the next section to see how to build the documentation localized.

Localizing
^^^^^^^^^^

To localize this documentation install `sphinx-intl:`

.. code-block:: console

   sudo  pip install sphinx-intl

Every time you have to update the translation files you have to update the .po files running the following commands:

.. code-block:: console

   cd docs # all commands must run in docs directory
   make gettext # generates .pot files
   sphinx-intl update -p build/gettext -l fr # generate .po files for fr lang

Then you can edit the .po files and commit them

To generate the documentation locally for the  you can run (on linux)

.. code-block:: console

   sphinx-build  -b html -D language=fr source build/html/fr

This will generate `mo` files that should be ignored in .gitignore
