import _ from 'lodash'

export const isStringOrNumber = child => _.isString(child) || _.isNumber(child)
export const joinChildren = children => {
  children = _.flattenDeep(children)
  if (!_.every(children, isStringOrNumber)) {
    throw new Error('all child should be string or number')
  }
  return children.join('')
}
