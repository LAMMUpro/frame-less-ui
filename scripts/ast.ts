import ts, { CallExpression, Decorator, StringLiteral } from 'typescript';
import * as fs from 'fs';
import { ClassDeclaration, JSDoc } from 'typescript';
import { SB } from '../src/types/storybook.ts';
import { getInfoFromJSDoc } from '../src/utils/storybook.ts';

const filename = './src/components/qr-code/index.ts';

const content = fs.readFileSync(filename, 'utf8');

const astTree = ts.createSourceFile('temp.ts', content, ts.ScriptTarget.ES2015);

function main() {
  const componentClassAst = astTree.statements
    .find(item => item.kind === ts.SyntaxKind.ClassDeclaration) as ClassDeclaration | undefined;
  if (!componentClassAst) return;

  const classDecoratorAst = componentClassAst.modifiers.find(item => item.kind === ts.SyntaxKind.Decorator) as Decorator | undefined;
  if (!classDecoratorAst) return console.warn('组件未使用装饰器');
  
  const componentName = ((classDecoratorAst.expression as CallExpression)?.arguments?.[0] as StringLiteral)?.text;
  if (!componentName) return console.warn('组件名获取失败');
  
  

  componentClassAst.members.forEach(member => {
    const infos = (member as SB.MemberJsDoc).jsDoc?.filter(Boolean).map(item => getInfoFromJSDoc(item)) || [];
    console.log(infos);
  })

}

main();
  