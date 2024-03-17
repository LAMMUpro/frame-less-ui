import { SB } from '@/types/storybook';
import { Meta } from '@storybook/web-components';
import ts, { CallExpression, CallSignatureDeclaration, ClassDeclaration, Decorator, Identifier, JSDoc, LiteralTypeNode, MethodDeclaration, ParameterDeclaration, ReturnStatement, StringLiteral, TypeAliasDeclaration, TypeLiteralNode } from 'typescript';

/** 文档table枚举 */
export const docTypes = ['prop', 'event', 'method', 'slot', 'cssvar', 'part'] as const;

/** lit生命周期函数列表 */
export const litLifecycle = [
  'connectedCallback',
  'disconnectedCallback',
  'attributeChangedCallback',
  'adoptedCallback',
  'hasChanged',
  'requestUpdate',
  'willUpdate',
  'render',
  'updateComplete',
]

/**
 * 文档配置
 */
export const tableInfoList = [
  {
    name: 'props',
    nameCh: '属性',
    columns: [
      {
        name: '属性名',
        key: 'name',
      },
      {
        name: '描述',
        key: 'describe',
      },
      {
        name: '类型',
        key: 'argsType',
      },
      {
        name: '默认值',
        key: 'default',
      },
    ],
  },
  {
    name: 'events',
    nameCh: '事件',
    columns: [
      {
        name: '事件名',
        key: 'name',
      },
      {
        name: '描述',
        key: 'describe',
      },
      {
        name: '参数类型(e.detail)',
        key: 'argsType',
      },
    ],
  },
  {
    name: 'methods',
    nameCh: '方法',
    columns: [
      {
        name: '方法名',
        key: 'name',
      },
      {
        name: '描述',
        key: 'describe',
      },
      {
        name: '参数详情',
        key: 'argsType',
      },
    ],
  },
  {
    name: 'slots',
    nameCh: '插槽',
    columns: [
      {
        name: '插槽名',
        key: 'name',
      },
      {
        name: '描述',
        key: 'describe',
      },
    ],
  },
  {
    name: 'cssvars',
    nameCh: 'css变量',
    columns: [
      {
        name: '变量名',
        key: 'name',
      },
      {
        name: '描述',
        key: 'describe',
      },
      {
        name: '值类型',
        key: 'argsType',
      },
      {
        name: '默认值',
        key: 'default',
      },
    ],
  },
  {
    name: 'parts',
    nameCh: 'part',
    columns: [
      {
        name: 'part值',
        key: 'name',
      },
      {
        name: '描述',
        key: 'describe',
      },
    ],
  }
]

/**
 * 从autoMeta中提取argTypes
 */
export function getArgTypesFromAutoMeta(metaCache: SB.AutoMeta) {
  return metaCache.tableInfo.props.reduce((result, item) => {
    result[item.name] = {
      description: item.describe,
      control: item.control || 'text',
      options: item.options,
      type: {
        required: item.required == undefined ? false : true,
      },
      defaultValue: {
        summary: item.control === 'number' ? +item.default: item.default,
      }
    }
    return result;
  }, {});
}

/**
 * 从argTypes中提取默认值作为args
 */
export function getDefaultArgs(argTypes: Meta['argTypes']) {
  const defaultArgs = {};
  Object.keys(argTypes).forEach(key => {
    const defaultValue = argTypes[key].defaultValue?.summary;
    if (defaultValue) defaultArgs[key] = defaultValue;
  })
  return defaultArgs;
}

/** 
 * 从jsDocItem中提取参数
 */
export function getInfoFromJSDoc<T extends { describe?: string } = Required<SB.DocInfo>>(jsDoc: JSDoc) {
  const info = jsDoc.tags?.reduce((result, item) => {
    if (item.tagName.escapedText.toString())
      result[item.tagName.escapedText.toString()] = item.comment;
    return result;
  }, {} as T) || {} as T;
  if (!info.describe)
    info.describe = jsDoc.comment?.toString() || '';
  return info;
}

/**
 * 从组件源文件中提取组件文档
 * @param astTree 
 * @returns 
 */
export function getComponentDocsInfo(autoMeta: SB.AutoMeta, astTree: ts.SourceFile, originCode: string) {
  const componentClassAst = astTree.statements
    .find(item => item.kind === ts.SyntaxKind.ClassDeclaration) as ClassDeclaration | undefined;
  if (!componentClassAst) return;

  const classDecoratorAst = componentClassAst.modifiers.find(item => item.kind === ts.SyntaxKind.Decorator) as Decorator | undefined;
  if (!classDecoratorAst) return console.warn('组件未使用装饰器');
  
  const componentName = ((classDecoratorAst.expression as CallExpression)?.arguments?.[0] as StringLiteral)?.text;
  if (!componentName) return console.warn('组件名获取失败');
  
  /**
   * 处理类jsDoc, 从最后一个JsDoc取下面数据, 从剩下的jsDoc提取cssvar
   * @subtitle 副标题
   * @description 组件描述
   */
  const classJsDocs = (<SB.MemberJsDoc>componentClassAst).jsDoc?.filter(Boolean) || [];
  const classJsDoc = classJsDocs?.pop();
  if (classJsDoc) {
    const docInfo = getInfoFromJSDoc<Partial<Pick<SB.AutoMeta, 'subtitle'> & {describe: string}>>(classJsDoc);
    autoMeta.subtitle = docInfo.subtitle || '';
    autoMeta.description = docInfo.describe || '';
  }
  classJsDocs.forEach(jsDocAst => {
    const jsDocInfo = getInfoFromJSDoc<{ 
      cssvar?: string
      describe?: string
      argsType?: string
      default?: string
    }>(jsDocAst);
    if (jsDocInfo.cssvar) {
      autoMeta.tableInfo.cssvars.push({
        name: jsDocInfo.cssvar,
        argsType: jsDocInfo.argsType,
        default: jsDocInfo.default,
        describe: jsDocInfo.describe,
      });
    }
  })

  /**
   * 处理事件
   */
  const EmitTypeAst = astTree.statements.find(item => item.kind === ts.SyntaxKind.TypeAliasDeclaration) as TypeAliasDeclaration;
  if (EmitTypeAst) {
    (<TypeLiteralNode>EmitTypeAst.type).members.filter(item => item.kind === ts.SyntaxKind.CallSignature)?.forEach((eventAst: CallSignatureDeclaration) => {
      const eventName = (<StringLiteral>(<LiteralTypeNode>(<ParameterDeclaration>eventAst.parameters[0])?.type)?.literal)?.text;
      
      const detailTypeStart = (<ParameterDeclaration>eventAst.parameters[1])?.type?.pos || 0;
      const detailTypeEnd = (<ParameterDeclaration>eventAst.parameters[1])?.type?.end || 0;
      const argsType = originCode.slice(detailTypeStart, detailTypeEnd).trim();

      /** 
       * 每个属性定义只取一个JsDoc
       */
      const jsDoc = (eventAst as SB.MemberJsDoc).jsDoc?.filter(Boolean)?.pop();
      let docInfo: SB.DocInfo = {
        name: eventName, // 无需jsDoc
        argsType, // 字符串截取第二个参数的ts类型
        describe: jsDoc?.comment?.toString() || '', //jsDoc
      }
      autoMeta.tableInfo.events.push(docInfo);
    })
  }

  /**
   * 处理属性
   */
  componentClassAst.members.forEach(member => {
    /** 
     * 是否是组件属性
     * 类属性定义 且 使用了@property装饰器
     */
    const isProp = 
      member.kind === ts.SyntaxKind.PropertyDeclaration && 
      ((<any>member).modifiers as Array<Decorator>)?.find(item => (<Identifier>(<CallExpression>item.expression)?.expression)?.escapedText?.toString?.() === 'property');

    if (isProp) {
      let docInfo: SB.DocInfo = {
        name: '', // 无需jsDoc
        required: false, // 无需jsDoc
        default: '', // 无需jsDoc
        control: 'text', // 推导
        argsType: '', // 推导
        describe: '',
        options: [],
      }
      /** 
       * 属性名
       */
      const propName = member.name.kind === ts.SyntaxKind.Identifier ? member.name.escapedText.toString(): '';
      if (!propName) console.warn('属性名异常');
      /** 
       * ts类型
       */
      const hasTsType = !!(member as any).type;
      const tsType: ts.KeywordSyntaxKind = (member as any).type?.kind;

      /** 
       * 默认值
       */
      const hasDefault = !!(member as any).initializer;
      const valueType:ts.LiteralSyntaxKind  =  (member as any).initializer?.kind;
      const defaultValue = (member as any).initializer?.text; // 还需要类型转换

      docInfo.name = propName;
      docInfo.required = !hasDefault && !(member as any).questionToken;
      if (hasDefault) docInfo.default = defaultValue; // TODO

      /** 
       * 每个属性定义只取一个JsDoc
       */
      const jsDoc = (member as SB.MemberJsDoc).jsDoc?.filter(Boolean)?.pop();
      if (jsDoc) {
        const jsDoc_parse = getInfoFromJSDoc(jsDoc);
        docInfo = {
          ...docInfo,
          ...jsDoc_parse,
        }
        
        if (hasTsType && !docInfo.control) {
          docInfo.control = 'multi-select'; // TODO 类型推断
        }

        /** 解析jsDoc的options */
        if (Object.prototype.toString.apply(docInfo.options) === '[object String]') {
          /** '替换成" */
          const optionsStr = (docInfo.options as any as string).replaceAll("'", '"');
          try {
            docInfo.options = JSON.parse(optionsStr);
          } catch {
            docInfo.options = [];
            console.warn(`> 组件: ${autoMeta.componentName}的属性描述 @options ${optionsStr}解析失败!`);
          }
        }
      }
      autoMeta.tableInfo.props.push(docInfo);
    }
  })

  /**
   * 处理方法
   */
  componentClassAst.members.forEach(methodAst => {
    /** 
     * 是否是组件方法
     * 类方法定义 且 不存在装饰器/private/protected修饰符 且 不是钩子函数
     */
    const methodName = (<Identifier>methodAst.name)?.escapedText?.toString();
    const isComponentMethod = 
      methodAst.kind === ts.SyntaxKind.MethodDeclaration && 
      !(<MethodDeclaration>methodAst).modifiers?.find(item => [ts.SyntaxKind.Decorator, ts.SyntaxKind.PrivateKeyword, ts.SyntaxKind.ProtectedKeyword].includes(item.kind)) &&
      !litLifecycle.includes(methodName);
    if (isComponentMethod) {
      const argsCodeStart = (<MethodDeclaration>methodAst).parameters.pos || 0;
      const argsCodeEnd = (<MethodDeclaration>methodAst).parameters.end || 0;
      const returnTypeCodeStart = (<MethodDeclaration>methodAst).type?.pos || 0;
      const returnTypeCodeEnd = (<MethodDeclaration>methodAst).type?.end || 0;
      const argsType = `(${originCode.slice(argsCodeStart, argsCodeEnd).trim()}) => ${originCode.slice(returnTypeCodeStart, returnTypeCodeEnd).trim() || 'void'}`;

      /** 
       * 只取一个JsDoc
       */
      const jsDoc = (methodAst as SB.MemberJsDoc).jsDoc?.filter(Boolean)?.pop();
      let docInfo: SB.DocInfo = {
        name: methodName, // 无需jsDoc
        argsType, // 字符串截取第二个参数的ts类型
        describe: jsDoc?.comment?.toString() || '', //jsDoc
      }
      autoMeta.tableInfo.methods.push(docInfo);
    }
  })

  /**
   * 处理插槽/part, 从render函数上的jsDoc取
   */
  componentClassAst.members.forEach(renderAst => {
    const methodName = (<Identifier>renderAst.name)?.escapedText?.toString();
    const isComponentRender = 
      renderAst.kind === ts.SyntaxKind.MethodDeclaration && 
      methodName === 'render';
    if (isComponentRender) {
      (<SB.MemberJsDoc>renderAst).jsDoc?.filter(Boolean)?.forEach(jsDocAst => {
        const jsDocInfo = getInfoFromJSDoc<{ slot?: string, part?: string, describe?: string }>(jsDocAst);
        if (jsDocInfo.slot) {
          autoMeta.tableInfo.slots.push({
            name: jsDocInfo.slot,
            describe: jsDocInfo.describe,
          });
        } else if (jsDocInfo.part) {
          autoMeta.tableInfo.parts.push({
            name: jsDocInfo.part,
            describe: jsDocInfo.describe,
          });
        }
      })
    }
  })
}