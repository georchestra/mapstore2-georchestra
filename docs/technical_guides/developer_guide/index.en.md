# Developer Guide

To work on `mapstore2-georchestra` locally you need:

- Node.js
- JDK 8 or newer
- Maven 3.x

Clone the repository with submodules:

```console
git clone --recursive https://github.com/georchestra/mapstore2-georchestra
```

Install frontend dependencies:

```console
npm install
```

Run a full build:

```console
./build.sh
```

## Backend setup for development

Local development usually relies on a proxied backend. Update `webpack.config.js` to point to the backend you want to use:

```javascript
const DEV_PROTOCOL = "http";
const DEV_HOST = "localhost:8080";
```

You can either work against an existing remote backend or deploy your locally built backend to Tomcat.

For a local backend:

- copy `mapstore.war` from `web/target/` to your Tomcat `webapps/` directory
- create a local geOrchestra data directory
- copy a standard `default.properties`
- copy the `mapstore/` directory generated under `web/target/geOrchestra/`
- set the JVM option `-Dgeorchestra.datadir=/etc/georchestra`
- adjust database and LDAP connection settings

If you do not have a local PostgreSQL database and LDAP directory, you can point the backend to remote services instead.

## Frontend development

Start the frontend with:

```console
npm start
```

The application is then available at `http://localhost:8081`.

## Mocking security headers

When the geOrchestra security proxy is not present locally, you can simulate its headers with a browser extension such as ModHeader.

Set:

- `sec-username`: the authenticated username
- `sec-roles`: semicolon-separated roles, for example `ROLE_MAPSTORE_ADMIN`

Disable the extension when you no longer need it.

## Styling and theming

MapStore2 lets you customize the default theme or create a new one.

- create a new directory under `themes/`, for example `themes/foo`
- copy a reference theme such as `dark` or `default`
- update `variables.less` and related styles
- rebuild and redeploy the webapp
- use the generated files from `dist/themes/`

To expose a theme in the context creator, add it to the `contextCreator.themes` list in `localConfig.json`:

```json
{
  "name": "ContextCreator",
  "cfg": {
    "themes": [
      {"id": "foo", "type": "link", "href": "dist/themes/foo.css"},
      {"id": "default", "type": "link", "href": "dist/themes/default.css"}
    ]
  }
}
```

The theme can then be selected from the context creator UI.

![Theme selector](images/theme-select.png)

To make a theme the default one, update `defaultState.theme.selectedTheme.id` in `localConfig.json`.
