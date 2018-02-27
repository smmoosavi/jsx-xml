import { joinChildren } from '../utils'

export default ({ children }) => {
  return { '#raw': joinChildren(children) }
}
