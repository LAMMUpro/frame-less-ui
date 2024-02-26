import path from 'path';
import { compile } from 'sass';
import { createFilter } from 'vite';

/**
* 处理.scss?inline的导入
* @param {*} options 
* @returns 
*/
export function InlineScssPlugin(options = {}) {
 /** 文件筛选 */
 const filter = createFilter(options.include, options.exclude);
 /**  */
 const inlineScssRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+)\?inline['"]/g;
 return {
   name: 'rollup-plugin-scss-inline',
   /** 源码编译/转换 */
   async transform(code, id) {
     if (!(filter(id))) return null; // 只处理匹配的文件
     const transformedCode = code.replace(inlineScssRegex, (match, varName, scssFilePath) => {
       /** 拿到scss源文件路径 */
       const absolutePath = path.resolve(path.dirname(id), scssFilePath);
       /** sass编译为css, 且进行压缩 */
       const result = compile(absolutePath, {style: "compressed"});
       const cssContent = result.css.replace(/'/g, "\\'");
       /** 编译为const xxx=`body{color: red;};这种格式` */
       return `const ${varName}=\`${cssContent}\`;`;
     });

     return {
       code: transformedCode,
       map: { mappings: '' },
     };
   }
 }
}