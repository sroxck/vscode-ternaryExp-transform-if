import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
interface FunctionNode{
  name:string,
  start:{
    line:number,
    column:number,
    index:number,
  }, 
  end:{
    line:number,
    column:number,
    index:number,
  }
}
export function getFunctionNode(code:string,index:number):FunctionNode|undefined{

  const ast = parse(code,{sourceType:"module"});
  let functionNode;
  traverse(ast,{
    ConditionalExpression(path){
      // if(path.node.expression.type !== 'ConditionalExpression') return 
      // console.log(path.node,'node','PATH',path);
      if(index>= path.node?.start! && index<= path.node?.end!)
      functionNode = {
        name:path.node?.type,
        start:path.node?.loc?.start, 
        end:path.node?.loc?.end
      }
    }
  });
  // console.log(functionNode,'ddd');
  return functionNode;
}
