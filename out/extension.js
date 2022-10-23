"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const transfrom_1 = require("./transfrom");
// import traverse from '@babel/traverse';
const ast_1 = require("./ast");
function activate(context) {
    vscode.commands.registerCommand('vscode-ternaryexp-transform-if.transform', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        ;
        // 转换 position位置类为索引
        const code = editor.document.getText();
        const index = editor.document.offsetAt(editor.selection.active);
        const functionNode = (0, ast_1.getFunctionNode)(code, index);
        const code1 = editor.document.getText(new vscode.Range(new vscode.Position(functionNode.start.line - 1, functionNode.start.column), new vscode.Position(functionNode.end.line - 1, functionNode.end.column)));
        if (!functionNode) {
            return;
        }
        console.log(code, '(code)', index);
        editor?.edit((builder) => {
            builder.replace(new vscode.Range(new vscode.Position(functionNode?.start.line - 1, functionNode.start.column), new vscode.Position(functionNode?.end.line - 1, functionNode.end.column)), (0, transfrom_1.transfromExpression)(code1));
            // builder.delete(new vscode.Range(
            // 	new vscode.Position(functionNode?.start.line - 1, functionNode.start.column),
            // 	new vscode.Position(functionNode?.end.line - 1, functionNode.end.column)));
        });
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map