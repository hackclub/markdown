import visit from 'unist-util-visit'

export default function shToShellPlugin() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang === 'sh') {
        node.lang = 'shell'
      }
    })
  }
}
