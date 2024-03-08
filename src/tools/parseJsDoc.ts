const regExpTempStr = /\/\*\*(?:.|\n)*?@ppp(?:.|\n)*?\*\/+/g.toString();

export function getRegExp(type: 'prop' | 'event' | 'method' | 'slot' | 'css var' | 'part') {
  return new RegExp(regExpTempStr.replace('ppp', type));
}

