import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
interface AstNode {
  name: string,
  start: {
    line: number,
    column: number,
    index: number,
  },
  end: {
    line: number,
    column: number,
    index: number,
  }
}
export function getFunctionNode(code: string, index: number): AstNode | undefined {

  const ast = parse(code, { sourceType: "module" });
  let AstNode;
  traverse(ast, {
    ConditionalExpression(path) {
      if (index >= path.node?.start! && index <= path.node?.end!)
        AstNode = {
          name: path.node?.type,
          start: path.node?.loc?.start,
          end: path.node?.loc?.end
        }
    }
  });
  return AstNode;
}
