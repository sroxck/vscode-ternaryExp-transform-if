"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionNode = void 0;
const parser_1 = require("@babel/parser");
const traverse_1 = require("@babel/traverse");
function getFunctionNode(code, index) {
    const ast = (0, parser_1.parse)(code, { sourceType: "module" });
    let functionNode;
    (0, traverse_1.default)(ast, {
        ConditionalExpression(path) {
            // if(path.node.expression.type !== 'ConditionalExpression') return 
            // console.log(path.node,'node','PATH',path);
            if (index >= path.node?.start && index <= path.node?.end)
                functionNode = {
                    name: path.node?.type,
                    start: path.node?.loc?.start,
                    end: path.node?.loc?.end
                };
        }
    });
    // console.log(functionNode,'ddd');
    return functionNode;
}
exports.getFunctionNode = getFunctionNode;
//# sourceMappingURL=ast.js.map