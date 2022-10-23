import {test,expect} from 'vitest';
import {getFunctionNode} from '../src/ast';
test('ast',()=>{
  const express = `'22' ? '33' : '44';'22' ? '33' : '44' `;
  const index = 4;

  const code = getFunctionNode(express,index);
  expect(code).toEqual({
    name:"ExpressionStatement",
    start:{
      line:2,
      column:6,
      index:7,
    }, 
    end:{
      line:2,
      column:6,
      index:7,
    }
  });
});
