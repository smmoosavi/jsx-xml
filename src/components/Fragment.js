import _ from 'lodash'

export default ({ children = [] }) => _.flattenDeep([children])
