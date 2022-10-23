"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfromExpression = void 0;
const parser_1 = require("@babel/parser");
const traverse_1 = require("@babel/traverse");
const types = require("@babel/types");
const generator_1 = require("@babel/generator");
function transfromExpression(express) {
    let ast = (0, parser_1.parse)(express, { sourceType: "module" });
    const visitor = {
        ConditionalExpression: {
            exit(path) {
                let { test, consequent, alternate } = path.node;
                let new_consequent = types.blockStatement([types.expressionStatement(consequent)]);
                let new_alternate = types.blockStatement([types.expressionStatement(alternate)]);
                let if_node = types.ifStatement(test, new_consequent, new_alternate);
                path.replaceWithMultiple(if_node);
                path.stop();
            },
        }
    };
    const visitor1 = {
        UnaryExpression(path) {
            let operator = path.node.operator;
            if (operator === "void") {
                path.replaceWithMultiple(path.node.argument);
            }
        },
    };
    (0, traverse_1.default)(ast, visitor1);
    (0, traverse_1.default)(ast, visitor);
    return (0, generator_1.default)(ast).code;
}
exports.transfromExpression = transfromExpression;
//# sourceMappingURL=transfrom.js.map