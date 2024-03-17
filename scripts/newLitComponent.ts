import fs from "fs";
import path from "path";
import readline from 'readline';
import { toCamelCase } from "../src/utils/index.ts";

/** 组件文件夹路径 */
const componentDir = "./src/components";

/**
 * 从控制台获取用户输入
 */
async function getInput(tip: string) {
  const readerName = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise<string>((resolve) => {
    readerName.question(tip, (value) => {
      readerName.close();
      resolve(value);
    });
  })
}

/**
 * 从控制台获取用户输入的组件名
 */
async function getComponentName() {
  const componentName = await getInput('请输入组件名, <fl-组件名>：');
  if (!componentName) return getComponentName();
  if (fs.existsSync(path.resolve(componentDir, componentName))) {
    console.warn('该组件对应路径已经存在! 请重新输入');
    return getComponentName();
  }
  return componentName;
}

async function main() {
  const componentName = await getComponentName();
  const className = toCamelCase(componentName[0].toUpperCase() + componentName.slice(1));

  const subtitle = await getInput('请输入组件副标题：') || '';
  const describe = await getInput('请输入组件描述：') || '';
  fs.mkdirSync(path.resolve(componentDir, componentName));
  fs.readdirSync('./template/lit-component').forEach(filename => {
    let codeStr = fs.readFileSync(path.resolve('./template/lit-component', filename), 'utf-8')
      .replaceAll('fl-temp-name', `fl-${componentName}`)
      .replaceAll('temp-name', componentName)
      .replaceAll('TempName', className);
    if (filename === 'index.ts') 
      codeStr = codeStr
        .replace('${组件副标题}', subtitle)
        .replace('${组件描述}', describe);
    fs.writeFile(path.resolve(componentDir, componentName, filename), codeStr, 'utf-8', ()=> {})
  })
  console.log('> 组件文件生成完毕, 请执行yarn build:meta');
}


main();
