import { joinChildren } from '../utils'

export default ({ children }) => {
  return { '#comment': joinChildren(children) }
}
