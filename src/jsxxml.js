import _ from 'lodash'

const isStringOrNumber = (child) => (_.isString(child) || _.isNumber(child))

const normalizeChildren = (children) => {
  return _.reduce(_.flatMapDeep(children), (acc, child) => {
    if (isStringOrNumber(child)) {
      if (acc.length === 0) {
        acc.push({'#text': `${child}`})
        return acc
      }
      const lastChild = acc[acc.length - 1]
      if (_.has(lastChild, ' #text')) {
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

const JSXXML = (tag, attr, ...children) => {
  if (_.isFunction(tag)) {
    return tag({...attr, children})
  }
  if (_.isString(tag)) {
    children = normalizeChildren(children)
    return {
      [tag]: [
        ...(attr ? [_.mapKeys(attr, (value, key) => '@' + key)] : []),
        ...children,
      ],
    }
  }
  throw new Error('tag should be function or string')
}
export default JSXXML
