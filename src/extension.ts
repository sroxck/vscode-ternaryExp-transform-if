import * as vscode from 'vscode';
import {transfromExpression} from './transfrom'
import { getFunctionNode } from './ast';
export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand('vscode-ternaryexp-transform-if.transform', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; };
		const code = editor.document.getText();
		const index = editor.document.offsetAt(editor.selection.active);
		const AstNode = getFunctionNode(code, index);
		const transformCode = editor.document.getText(new vscode.Range(new vscode.Position(AstNode!.start.line - 1, AstNode!.start.column),
		new vscode.Position(AstNode!.end.line - 1, AstNode!.end.column)))

		if (!AstNode) {
			return;
		}

		editor?.edit((builder) => {
			builder.replace(new vscode.Range(
				new vscode.Position(AstNode?.start.line - 1, AstNode.start.column),
				new vscode.Position(AstNode?.end.line - 1, AstNode.end.column)),transfromExpression(transformCode));
		})
	});
}

