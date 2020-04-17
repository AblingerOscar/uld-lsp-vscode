/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// The server is implemented in dotnet
	const serverExe = 'dotnet'

	const serverPath = 'C:/Users/Oscar/Projects/master-thesis/autosupport-lsp-server/autosupport-lsp-server/bin/Release/netcoreapp3.1/autosupport-lsp-server.dll'
	const descriptionFilePath = 'test1'

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	let serverOptions: ServerOptions = {
		run: { command: serverExe, args: [ 
			serverPath, descriptionFilePath, 'test2'
		] },
		debug: { command: serverExe, args: [ 
			serverPath, descriptionFilePath, 'test2'
 		] }
	}


	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'plaintext' }],
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerExample',
		'Language Server Example',
		serverOptions,
		clientOptions
	);

	console.log('Client configured… starting server')

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
