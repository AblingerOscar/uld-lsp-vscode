/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { workspace, ExtensionContext, extensions } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions
} from 'vscode-languageclient';

let client: LanguageClient;
const extensionPath = extensions.getExtension("AblingerOscar.autosupport-lsp-vscode").extensionPath;

export function activate(context: ExtensionContext) {

	// The server is implemented in dotnet
	const serverExe = 'dotnet'

	const serverPath = extensionPath + '/server/autosupport-lsp-server.dll'

	const config = workspace.getConfiguration('autosupport-lsp-vscode')
	const {
		languageId,
		languageScheme,
		languagePattern,
		definitionFilePath
	} = config.get('languageDefinitionFiles')[0]

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
	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: languageScheme, pattern: languagePattern }, { scheme: languageScheme, language: languageId }],
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		`autosupport-lsp-vscode`,
		`Autosupport language server`,
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
