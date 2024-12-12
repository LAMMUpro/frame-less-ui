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

/**
 * 递归复制文件夹内的文件
 * @param src 源文件夹路径
 * @param dest 目标文件夹路径
 * @example copyFolderSync('./template/vue-component', './src/components/button')
 */
function copyFolderSync(src: string, dest: string, cb?: (content: string) => string) {
  // 如果目标文件夹不存在则创建
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  // 读取源文件夹中的所有文件/文件夹
  const files = fs.readdirSync(src);

  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    // 判断是文件还是文件夹
    if (fs.statSync(srcPath).isDirectory()) {
      // 如果是文件夹就递归复制
      copyFolderSync(srcPath, destPath, cb);
    } else {
      // 如果是文件就读取文件内容，并将cb(内容)的结果写入到目标文件
      const content = fs.readFileSync(srcPath, 'utf-8')
      fs.writeFile(destPath, cb ? cb(content) : content, 'utf-8', ()=> {})
    }
  });
}

async function main() {
  const componentName = await getComponentName();
  const className = toCamelCase(componentName[0].toUpperCase() + componentName.slice(1));

  // const subtitle = await getInput('请输入组件副标题：') || '';
  // const describe = await getInput('请输入组件描述：') || '';
  if (!fs.existsSync(path.resolve(componentDir, componentName))) {
    fs.mkdirSync(path.resolve(componentDir, componentName));
  }
  
  /** 
   * 复制./template/vue-component文件夹下面所有的文件到./src/components/${componentName}
   * 包括文件夹下面的文件
   */
  copyFolderSync(
    path.resolve('./template/vue-component'), 
    path.resolve(componentDir, componentName),
    (content) => {
      return content.replaceAll('fl-temp-comp', `fl-${componentName}`)
        .replaceAll('temp-comp', componentName)
        .replaceAll('TempComp', className);;
    }
  );
}

main();