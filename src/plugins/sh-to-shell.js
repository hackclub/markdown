import visit from 'unist-util-visit'

export function shToShellPlugin() {
  return (tree) =>
    new Promise(async (resolve, reject) => {
      visit(tree, 'code', (node) => {
        if (node.lang === 'sh') {
          node.lang = 'shell'
        }
      })
      resolve()
    })
}
