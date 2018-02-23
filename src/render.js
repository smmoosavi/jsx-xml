import xmlbuilder from 'xmlbuilder'

const render = (x, {xmldec, doctype, createOptions, endOptions}) => {
  return xmlbuilder.create(x, xmldec, doctype, {...createOptions, separateArrayItems: true}).end(endOptions)
}
export default render
