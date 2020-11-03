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
				'id': 'ext-react-ts',
				'icon': './assets/images/webapplication.svg',
				'caption': 'React Web Application ',
				'description': 'A template to create a new React Web Application to run on the browser.',
				'languages': ['TypeScript'],
				'platforms': ['Web'],
				'types': ['Application'],
				'projectname': 'reactapplication',
				'fields': [
					{
						"name": "gitInit",
						"label": "Initialize git repository",
						"type": "boolean",
						"default": true
					},
					{
						"name": "pkgManager",
						"label": "Package manager",
						"type": "dropdown",
						"default": "npm",
						"options": [
							"npm",
							"yarn"
						]
					}
				]
			});

			result.push({
				'id': 'ext-react-js',
				'icon': './assets/images/webapplication.svg',
				'caption': 'React Web Application ',
				'description': 'A template to create a new React Web Application to run on the browser.',
				'languages': ['JavaScript'],
				'platforms': ['Web'],
				'types': ['Application'],
				'projectname': 'reactapplication',
				'fields': [
					{
						"name": "gitInit",
						"label": "Initialize git repository",
						"type": "boolean",
						"default": true
					},
					{
						"name": "pkgManager",
						"label": "Package manager",
						"type": "dropdown",
						"default": "npm",
						"options": [
							"npm",
							"yarn"
						]
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
					pkgManager: params.pkgManager
				};

				process.chdir(outputpath);
				let newappfolder = outputpath;
				//@ts-ignore		
				helpers.run(path.join(context.extensionPath, 'node_modules', 'generator-react-new', 'generators', 'app'), { cwd: outputpath })
					.withOptions({
						skipInstall: false
					})
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
