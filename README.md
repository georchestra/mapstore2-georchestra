# geOrchestra


## MapStore Project for geOrchestra

Documentation: https://docs.georchestra.geo-solutions.it/ (domain will change)

See https://georchestra.geo-solutions.it/ (work in progress)

## Building and install the project

### Prerequisite

**1. Requirements**

You need to read the relevant requirements documentation according to your installation :

https://docs.mapstore.geosolutionsgroup.com/en/latest/developer-guide/requirements/

To read the appropriate requirements page, open the previous link and select the corresponding MapStore2 release in the bottom right corner.

**2. Clone the repository**

`git clone --recursive https://github.com/georchestra/mapstore2-georchestra.git`

**3. Install NodeJS**

:warning: For minimal you may need to increase used memory limits.

To get more informations about nodejs install :

* Instructions to install Nodejs from package manager : [here](https://nodejs.org/en/download/package-manager/)
* Download source : [here](https://nodejs.org/en/download/)
* Download a specific version : [here](https://nodejs.org/dist/) (v16 is recommended)

**4. Install Java SDK**

If needed you can download Java here :

* [8 (min)](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* [9 (recommended)](https://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase9-3934878.html)
* [11 (max)](https://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase11-5116896.html)

**5. Install Maven**

Install latest Maven, if needed, from [here](https://maven.apache.org/download.cgi).

### Build 

Build the deployable war :

```
cd mapstore2-georchestra
./build.sh [version_identifier]
```

Where *version_identifier* is an optional identifier of the generated war that will be shown in the settings panel of the application.

## Publish

Deploy the generated `mapstore.war` file (in web/target) to your favorite J2EE container (e.g. Tomcat).

Tomcat versions 7.x, 8.x and 9.x are supported.
The latest of each can be donwloaded from:

* [7.x](https://tomcat.apache.org/download-70.cgi)
* [8.x](https://tomcat.apache.org/download-80.cgi)
* [9.x](https://tomcat.apache.org/download-90.cgi)

## Building the documentation

To build the documentation you need [sphinx](https://www.sphinx-doc.org/en/master/usage/installation.html) and some extensions (sphinx_rtd_theme and recommonmark), you can install using pip :

```sh
pip install sphinx_rtd_theme
pip install recommonmark
```

Now, you can build html documentation using :

```sh
cd docs # enter in the docs folder
make html # create html documentation
```
## Versioning
`MapStore2-geOrchestra` and `MapStore2` versions(**_stable branch name_**) are added to `version.txt` one below the other (_order is strictly followed_)

**Example**:
```
version-mp2-georchestra
version-mp2
```

## Release procedure

All developments land in master branch first and releases will be created from a stable branch.
As soon as a new major version is ready to be released (developments on master are completed and tested) a new stable branch will be created from master (YYYY.MM.xx, eg. 2022.02.xx).
That naming convention has been agreed because typically a stable branch in mapstore2-georchestra refers to the corresponding one in MapStore.

As well as for the master branch, each stable branch should always report inside the version.txt file its name and the name
of the corresponding stable MapStore branch: the first line of the file indicate the name of the project branch while the
second the corresponding MapStore stable branch name used as dependency.

Given a stable branch in mapstore2-georchestra, further minor releases of the same series (e.g. `2022.02`) are delivered from it (e.g. `2022.02.01-geOrchestra`).
Before each release or release candidate and in order to benefit from other bugfixes and feature backports, the MapStore submodule should be updated to the latest
commit in the MapStore stable branch tracked by mapstore2-georchestra.
At each release or release candidate the first line of the version.txt is updated with the tag name and restored to the previous version after the tag generation.

All the releases are first delivered as release candidates, turned into release after acceptance.


### Creating release candidate:
- Given a stable branch in mapstore2-georchestra, update the first line of the `version.txt` file reporting the version (tag name)
that is going to be released using the following naming convention: `YYYY.MM.xx-RCX-geOrchestra` (e.g. `2022.02.00-RC1-geOrchestra`),
where `YYYY.MM` corresponds to the major version and `xx` is the number of the minor release of the same series;
`RCX` is the number of release candidate for the same version;
- create a new pre-release and tag for it at [Release creation page](https://github.com/georchestra/mapstore2-georchestra/releases/new)
using the same name specified in `version.txt`
- Add exhaustive description of the pre-release and attach all the needed assets:
  - *.war file for mapstore2-georchestra build
  - Link to the docker image in GeoSolutions Docker Hub
  - Link to the corresponding release page in MapStore as soon as available
  - Relevant configuration steps expected for the new version
- Restore the first line of the `version.txt` file to the previous version in the stable branch

### Creating release
- Given a RC already available and accepted
- From the current stable branch corresponding to the series version to be released, update the first line of the `version.txt`
file reporting the version (tag name) that is going to be released using the following naming convention:  `YYYY.MM.xx-geOrchestra`, where `YYYY.MM` corresponds to the major version and `xx`
is the number of the minor release of the same series (e.g. `2022.02.00-geOrchestra`)
- create a new release and tag for it at [Release creation page](https://github.com/georchestra/mapstore2-georchestra/releases/new)
using the same name specified in `version.txt`
- Add exhaustive description of the release (including descriptions from all release candidates) and attach all the needed assets:
    - *.war file for mapstore2-georchestra build
    - Link to the docker image in GeoSolutions Docker Hub
    - Link to the corresponding release page in MapStore as soon as available
    - Relevant configuration steps expected for the new version
- Restore the first line of the version.txt file to the previous version in the stable branch
