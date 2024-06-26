import { TreeNode, TreeProps } from '../index'

export const getCheckedNodes = (nodes: TreeNode[], mode: TreeProps['mode']) => {
  let res: TreeNode[] = []
  nodes.forEach((node) => {
    const { nodes: childs, ...nodeInfo } = node
    if (node.checked) {
      if (mode === 'disable') {
        if (!childs || childs.length === 0) {
          res.push(nodeInfo)
        }
      } else if (mode === 'shortcut') {
        if (!childs || childs.length === 0) {
          res.push(nodeInfo)
        }
      } else if (mode === 'related') {
        res.push(nodeInfo)
        return
      } else {
        res.push(nodeInfo)
      }
    }
    if (childs) {
      res = res.concat(getCheckedNodes(childs, mode))
    }
  })
  return res
}
