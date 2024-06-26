const searchNodes = (nodes, searchText, mode) => {
  const getNodes = (result, node) => {
    const isMatched = node.label.toLowerCase().includes(searchText.toLowerCase())
    if (isMatched) {
      if (mode !== 'disable') {
        result.push({
          ...node,
          nodes: Array.isArray(node.nodes) ? node.nodes.reduce(getNodes, []) : []
        })
      } else {
        result.push(node)
      }
      return result
    }
    if (Array.isArray(node.nodes)) {
      const nodes = node.nodes.reduce(getNodes, [])
      if (nodes.length) result.push({ ...node, nodes })
    }

    return result
  }

  return nodes.reduce(getNodes, [])
}

export default searchNodes
