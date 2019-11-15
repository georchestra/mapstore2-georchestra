geOrchestra
==========

MapStore Project for geOrchestra
------------
Documentation: https://docs.georchestra.geo-solutions.it/ (domain will change)

See https://georchestra.geo-solutions.it/ (work in progress)


Building the project
------------

Clone the repository:

`git clone --recursive https://github.com/georchestra/mapstore2-georchestra.git`

Install latest 8.x NodeJS, if needed, from [here](https://nodejs.org/dist/latest-v8.x/).( minimal versions: NodeJS >= 8, npm >= 5 )

Install Java SDK, if needed from [here](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) (version 1.8 is required)

Install latest Maven, if needed, from [here](https://maven.apache.org/download.cgi) (version 3.5.2 is required).

Build the deployable war:

`./build.sh [version_identifier]`

Where version_identifier is an optional identifier of the generated war that will be shown in the settings panel of the application.

Deploy the generated GeOrchestra.war file (in web/target) to your favourite J2EE container (e.g. Tomcat).

Building the documentation
--------------------------

To build the documentation you need [sphinx](https://www.sphinx-doc.org/en/master/usage/installation.html) and some extensions (sphinx_rtd_theme and recommonmark), you can install using pip :

```sh
pip install sphinx_rtd_theme
pip install recommonmark
```

than you can build html documentation using :

```sh
cd docs # enter in the docs folder
make html # create html documentation
```
