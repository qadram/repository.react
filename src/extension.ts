// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as helpers from 'yeoman-test';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let api = {
		/**
		 * Should return an array with all the items to be shown on the repository 
		 */
		getItems(): Array<any> {
			let result: Array<any> = [];

			//Every item can have extra fields, to prompt the user for additional information
			result.push({
				'id': 'ext-web-app',
				'icon': './assets/images/webapplication.svg',
				'caption': 'TMS Web Application',
				'description': 'A template to create a new TMS Web Application to run on the browser.',
				'languages': ['Object Pascal'],
				'platforms': ['Web'],
				'types': ['Application'],
				'projectname': 'Project1.dproj',
				'fields': [
					{
						"name": "gitInit",
						"label": "Initialize git repository",
						"type": "boolean",
						"default": true
					}
				]
			});

			result.push({
				'id': 'ext-console-app',
				'icon': './assets/images/consoleapp.svg',
				'caption': 'TMS Web Console Application',
				'description': 'A template to create a new TMS Web Application to run on the browser with a console interface.',
				'languages': ['Object Pascal'],
				'platforms': ['Web'],
				'types': ['Application'],
				'projectname': 'Project1.dproj',
				'fields': [
					{
						"name": "gitInit",
						"label": "Initialize git repository",
						"type": "boolean",
						"default": true
					}
				]
			});

			result.push({
				'id': 'ext-electron-app',
				'icon': './assets/images/electronapp.svg',
				'caption': 'TMS Web Electron Application',
				'description': 'A template to create a new TMS Web Electron Application.',
				'languages': ['Object Pascal'],
				'platforms': ['Linux', 'Windows', 'macOS'],
				'types': ['Application'],
				'projectname': 'Project1.dproj',
				'fields': [
					{
						"name": "gitInit",
						"label": "Initialize git repository",
						"type": "boolean",
						"default": true
					}
				]
			});

			result.push({
				'id': 'ext-pwa-app',
				'icon': './assets/images/pwaapp.svg',
				'caption': 'TMS Web PWA Application',
				'description': 'A template to create a new TMS Progressive Web Application to run on the browser or be installed on the operating system.',
				'languages': ['Object Pascal'],
				'platforms': ['Web'],
				'types': ['Application'],
				'projectname': 'Project1.dproj',
				'fields': [
					{
						"name": "gitInit",
						"label": "Initialize git repository",
						"type": "boolean",
						"default": true
					}
				]
			});

			return (result);
		},
		/**
		 * This function is called when the user executes a repository item
		 * @param id ID of the item to be executed
		 * @param params All parameters gathered on the UI
		 */
		async execute(id: string, params: any): Promise<string> {
			return new Promise<string>((resolve, reject) => {
				let outputpath = params.outputpath;
				let prompts = {};

				prompts =
				{
					type: id,
					projectname: params.projectname,
					gitInit: params.gitInit,
				};

				process.chdir(outputpath);
				let newappfolder = outputpath;
				//@ts-ignore		
				helpers.run(path.join(context.extensionPath, 'node_modules', 'generator-tms-web-core', 'generators', 'app'), { cwd: outputpath })
					.withPrompts(prompts) // Mock the prompt answers
					.toPromise().then(function () {
						resolve(newappfolder);
					}, (reason) => {
						reject(reason);
					});
			});
		}
	};
	return (api);
}

// this method is called when your extension is deactivated
export function deactivate() { }
