import _ from 'lodash'
import { isStringOrNumber } from './utils'

const normalizeChildren = (children) => {
  return _.reduce(_.flatMapDeep(children), (acc, child) => {
    if (isStringOrNumber(child)) {
      if (acc.length === 0) {
        acc.push({'#text': `${child}`})
        return acc
      }
      const lastChild = acc[acc.length - 1]
      if (_.has(lastChild, '#text')) {
        lastChild['#text'] = `${lastChild['#text']}${child}`
        return acc
      } else {
        acc.push({'#text': `${child}`})
        return acc
      }
    } else if (_.isObject(child)) {
      acc.push(child)
      return acc
    }
    return acc
  }, [])
}

const JSXXML = (type, attr, ...children) => {
  if (_.isFunction(type)) {
    return type({
      ...attr,
      ...(children.length > 0 ? {children} : {}),
    })
  }
  if (_.isString(type)) {
    children = normalizeChildren(children)
    attr = _.omitBy(attr, (value, key) => key.startsWith('__'))
    attr = _.mapKeys(attr, (value, key) => '@' + key)
    return {
      [type]: [
        ...(_.isEmpty(attr) ? [] : [attr]),
        ...children,
      ],
    }
  }
  throw new Error('type should be function or string')
}
export default JSXXML
