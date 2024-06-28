import updateNodes from './updateNodes'

const initNodes = (data, parentNode, fllowCheck = true) => {
  let newData = [...data]

  newData = newData.map((node) => {
    const isCheckedParent = parentNode?.checked
    const newNode = {
      checked: !!isCheckedParent && fllowCheck,
      expanded: false,
      indeterminate: false,
      ...node
    }

    if (Array.isArray(newNode.nodes)) {
      newNode.nodes = initNodes(newNode.nodes, newNode, fllowCheck)
    }

    return newNode
  })
  return updateNodes(newData)
}

export default initNodes
