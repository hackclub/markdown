import visit from 'unist-util-visit'

export function shToBashPlugin() {
  return (tree) =>
    new Promise(async (resolve, reject) => {
      visit(tree, 'code', (node) => {
        console.info(node)
        if (node.lang === 'sh') {
          node.lang = 'shell'
        }
        console.info(node)
      })
      resolve()
    })
}
