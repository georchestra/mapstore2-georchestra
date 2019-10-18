
Localize this documentation
^^^^^^^^^^^^^^^^^^^^^^^^^^^

To localize this documentation install sphinx-intl:

.. code-block:: console

   sudo  pip install sphinx-intl

Every time you have to update the translation files you have to update the .po files running the following commands:

.. code-block:: python

   cd docs # all commands must run in docs directory
   make gettext # generates .pot files
   sphinx-intl update -p build/gettext -l fr # generate .po files for fr lang

Then you can edit the .po files and commit them

To generate the documentation locally for the  you can run (on linux)

.. code-block:: console

   sphinx-build  -b html -D language=fr source build/html/fr

This will generate `mo` files that should be ignored in .gitignore
