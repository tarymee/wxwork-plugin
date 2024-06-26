import updateChildNodeStatus from './updateChildNodeStatus'
const updateNodeById = (nodes, id, newNode, updateChild = true) =>
  nodes.map((node) => {
    let currentNode = node
    if (currentNode.id === id) {
      if (updateChild) {
        currentNode = updateChildNodeStatus(Object.assign(node, newNode))
      } else {
        currentNode = Object.assign(node, newNode)
      }
    } else if (Array.isArray(currentNode.nodes)) {
      currentNode.nodes = updateNodeById(node.nodes, id, newNode, updateChild)
    }

    return currentNode
  })

export default updateNodeById
