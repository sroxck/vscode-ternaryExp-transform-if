import * as vscode from 'vscode';
import { parse } from '@babel/parser';
import {transfromExpression} from './transfrom'
// import traverse from '@babel/traverse';
import { getFunctionNode } from './ast';
export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand('vscode-ternaryexp-transform-if.transform', () => {

		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; };
		// 转换 position位置类为索引
		const code = editor.document.getText();

		const index = editor.document.offsetAt(editor.selection.active);

		const functionNode = getFunctionNode(code, index);
		const code1 = editor.document.getText(new vscode.Range(new vscode.Position(functionNode!.start.line - 1, functionNode!.start.column),
		new vscode.Position(functionNode!.end.line - 1, functionNode!.end.column)))

		if (!functionNode) {
			return;
		}
		console.log(code,'(code)',index)

		editor?.edit((builder) => {
			builder.replace(new vscode.Range(
				new vscode.Position(functionNode?.start.line - 1, functionNode.start.column),
				new vscode.Position(functionNode?.end.line - 1, functionNode.end.column)),transfromExpression(code1));
			// builder.delete(new vscode.Range(
			// 	new vscode.Position(functionNode?.start.line - 1, functionNode.start.column),
			// 	new vscode.Position(functionNode?.end.line - 1, functionNode.end.column)));
		})
	});
}

