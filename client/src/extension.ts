/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import fs = require('fs');
import { workspace, ExtensionContext, extensions } from 'vscode'
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions
} from 'vscode-languageclient'
import { parseString } from 'xml2js'

let client: LanguageClient;
const extensionPath = extensions.getExtension("AblingerOscar.uld-lsp-vscode").extensionPath;

export function activate(context: ExtensionContext) {

	// The server is implemented in dotnet
	const serverExe = 'dotnet'
	
	const serverPath = extensionPath + '/server/uld-lsp-server.dll'

	const config = workspace.getConfiguration('uld-lsp-vscode')
	const definitionFilePath: string = config.get('definitionFilePath')
	const languageScheme: string = config.get('languageScheme')

	fs.readFile(definitionFilePath, { encoding: "utf-8" }, (err, data) => {
		parseString(data, (_, langDef) => {
			const languageId = langDef.languageDefinition.$.name
			const languagePattern = langDef.languageDefinition.$.filePattern

			// If the extension is launched in debug mode then the debug server options are used
			// Otherwise the run options are used
			let serverOptions: ServerOptions = {
				run: { command: serverExe, args: [ 
					serverPath, definitionFilePath
				] },
				debug: { command: serverExe, args: [ 
					serverPath, definitionFilePath
				] }
			}

			// Options to control the language client
			const clientOptions: LanguageClientOptions = {
				documentSelector: [{ scheme: languageScheme, pattern: languagePattern }, { scheme: languageScheme, language: languageId }],
			};

			// Create the language client and start the client.
			client = new LanguageClient(
				`uld-lsp-vscode`,
				`uld language server`,
				serverOptions,
				clientOptions
			);

			// Start the client. This will also launch the server
			client.start();
		})
	})
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
