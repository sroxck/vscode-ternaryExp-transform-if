import {parse} from "@babel/parser"
import  traverse from "@babel/traverse"
import * as types from "@babel/types"
import pkg from "@babel/generator"

export function transfromExpression(express:any){
 
  let ast = parse(express,{sourceType:"module"});
    const visitor ={
        ConditionalExpression: {
            exit(path:any) {
                let {test, consequent, alternate} = path.node;
                let new_consequent = types.blockStatement([types.expressionStatement(consequent)]);
                let new_alternate = types.blockStatement([types.expressionStatement(alternate)]);
                let if_node = types.ifStatement(test, new_consequent, new_alternate);
                path.replaceWithMultiple(if_node);
                path.stop()
            },
        }
    }
const visitor1 = {
        UnaryExpression(path:any) {
            let operator = path.node.operator;
            if (operator === "void") {
                path.replaceWithMultiple(path.node.argument)
            }
        },
    }
  traverse(ast, visitor1)
  traverse(ast, visitor)
  return pkg(ast).code
}
