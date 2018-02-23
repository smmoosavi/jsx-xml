import xmlbuilder from 'xmlbuilder'

const render = (jsx, {xmldec, doctype, createOptions, endOptions} = {}) => {
  return xmlbuilder.create(jsx, xmldec, doctype, {...createOptions, separateArrayItems: true}).end(endOptions)
}
export default render
