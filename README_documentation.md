# MapStore2 for geOrchestra : Documentation


## Online documentation

The online documentation is available here : [https://docs.georchestra.org/mapstore2/](https://docs.georchestra.org/mapstore2/).

The previous documentation (from the beginning of the project) is available here : [https://georchestra-mapstore2.readthedocs.io/en/latest/mapstore/index.html](https://georchestra-mapstore2.readthedocs.io/en/latest/mapstore/index.html).


## Contributing to the documentation

This documentation is cloned from the geOrchestra documentation template available here : [https://github.com/georchestra/georchestra_documentation/](https://github.com/georchestra/georchestra_documentation/).

To contribute, you have to setup a MkDocs environnement :

```bash
# install mkdocs
python -m venv venv_mkdocs
source venv_mkdocs/bin/activate
pip install -r mkdocs-requirements.txt
```

Test :

```bash
mkdocs --version
```

See the documentation, locally :

```bash
mkdocs serve
```

Then go to : [http://localhost:8000/](http://localhost:8000/)



# Mise en place de l'environnement mkdocs dans gitbash sur windows

## Exemple la première fois

cd /c/DepotsGit/georchestra/mapstore2-georchestra

- se mettre sur la branche de la doc: git checkout new_documentation
- mettre à jour le dépôt : git pull origin new_documentation
- créer l'environnement : python -m venv venv_mkdocs
- activer MkDoc : source venv_mkdocs/Scripts/activate
- installer les dépendances : pip install -r mkdocs_requirements.txt
- vérifier la version de mkdocs: mkdocs --version
- lancer le serveur local : mkdocs serve -a localhost:8002

## Exemple La reprise

- mettre à jour le dépôt : git pull origin new_documentation
- activer MkDoc : source venv_mkdocs/Scripts/activate
- lancer le serveur local : mkdocs serve -a localhost:8002

- pour sortir de l'environnement virtuel : deactivate