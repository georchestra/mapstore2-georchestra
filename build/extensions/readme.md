# Sample extension build directory

This directory is a sample build directory to create a sample extension plugin.

To test the extension:

- run `npm run run-extension`
- point your browser to localhost:8081

To create the extension zip:

- run `npm run build-extension`
- create a zip (You can name it `SampleGeOrchestraExtension.zip`) copying in the root the content of `bundle` folder and dist/extensions/extension.js. The final content should be something like:
  - `extensions.js`
  - `index.json`
  - `translations` (folder)
