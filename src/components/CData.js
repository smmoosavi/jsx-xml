import { joinChildren } from '../utils'

export default ({children}) => {
  return {'#cdata': joinChildren(children)}
}
