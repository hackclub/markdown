// Derived from https://github.com/jaywcjlove/rehype-video/tree/main/src

import visit from 'unist-util-visit'
import { detailsNode } from './node'

// TODO improve regex
const videoTest = /^(https?:\/\/[^\s]+(\.mp4|\.mov))$/

// const srcDelimiter = /((?:https?:\/\/)(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/g

function nodeToDetails(node, src) {
  const filename = src.split('/').pop()
  const newNode = detailsNode(filename, src)
  for (const k in newNode) node[k] = newNode[k]
}

const videoLinkToDetails = () => {
  const nodeTest = (node) => {
    const child = node.children && node.children[0]
    const grandChild = child && child.children && child.children[0]
    return (
      node.tagName === 'p' &&
      node.children.length === 1 &&
      child.tagName === 'a' &&
      child.children.length === 1 &&
      grandChild.type === 'text' &&
      videoTest.test(grandChild.value)
    )
  }

  return (tree) => {
    visit(tree, nodeTest, (node) => {
      const grandchild = node.children[0].children[0]
      nodeToDetails(node, grandchild.value)
    
      // if (
      //   child.type === 'element' &&
      //   child.tagName === 'a' &&
      //   child.properties &&
      //   typeof child.properties.href === 'string' &&
      //   videoTest.test(child.properties.href)
      // ) {
      //   nodeToDetails(node, child.properties.href)
      // }
    })
  }
}

export default videoLinkToDetails
