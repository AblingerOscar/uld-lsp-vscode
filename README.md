# ULD LSP VSCode

## How to use this

1. Download the files from a release of the [server](https://github.com/AblingerOscar/uld-lsp-server/releases) and unpack them in the server directory of this extension
2. If the name of the server is different, update it in `client/src/extension.ts` by updating the [`serverPath`](https://github.com/AblingerOscar/uld-lsp-vscode/blob/7e5275512c6e43eca64bf3bf630b83b5e7c8a384/client/src/extension.ts#L22) variable accordingly
3. If you opened the extension folder in vscode, you should be able to simply run the `Launch Client` run configuration (Press Ctrl+Shift+D to switch to the Run Tab)
4. The first time you start it, the server will fail to start – this is because it does not yet know which definition file to use
   1. In the settings of the launched visual studio code instance (Ctrl+,) search for `uld-lsp-vscode: Language Definition Files` and press `Edit in settings.json`
   2. Fill out the `languageId`, `languageScheme`, `languagePattern` and `definitionFilePath` properties correctly. If you want to use the examples, it should look like this:
   ```json
    "uld-lsp-vscode.languageDefinitionFiles": [
        {
            "languageId": "cocol-2",
            "languageScheme": "file",
            "languagePattern": "**/*.atg",
            "definitionFilePath": "c:\\Users\\Oscar\\Projects\\master-thesis\\uld-lsp-vscode\\examples\\Cocol-2.def"
        }
    ],
   ```

## Disclaimer

Originally started from the template provided by Microsoft found at
[their Github repository](https://github.com/Microsoft/vscode-extension-samples/tree/master/lsp-sample).

That template was provided under the MIT license with the following
text in their [LICENSE file](https://github.com/microsoft/vscode-extension-samples/blob/master/LICENSE):

```
Copyright (c) Microsoft Corporation

All rights reserved. 

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS 
BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT 
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

Modifications to this template are licensed as mentioned in the LICENSE file of this repository.
