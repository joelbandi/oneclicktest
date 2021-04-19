import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('oneclicktest.aboutme', () => {
		vscode.window.showInformationMessage('Made by @joelbandi');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('oneclicktest.runtest', () => {
		let cmd = `ruby -Itest ${activeEditorFilePath()}`

		let activeTextEditor = vscode.window.activeTextEditor;
		let selected = activeTextEditor?.selection;

		if (!selected?.isEmpty) {
			cmd = cmd + ` --name ${activeTextEditor?.document.getText(selected)}`
		}

		runCmd(cmd);
	}));

	const activeEditorFilePath = () => {
		return vscode.window.activeTextEditor?.document.uri.fsPath;
	}

	const runCmd = (cmd: string) => {
		let activeTerm = vscode.window.activeTerminal
		if (activeTerm === undefined) {
			activeTerm = vscode.window.createTerminal();
		}
		activeTerm.show(false);
		activeTerm.sendText(cmd)
	}
}

// this method is called when your extension is deactivated
export function deactivate() { }
