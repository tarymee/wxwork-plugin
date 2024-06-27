export const listToTree = (data: any[], id: string, pid: string, label: string, children = 'nodes'): any[] => {
  const cloneData = JSON.parse(JSON.stringify(data))
  const map = new Map()
  const parentids: string[] = []
  cloneData.forEach((d: any) => {
    if (!d[id]) throw new Error('请设置正确的id和parentid')
    map.set(d[id], true)
    d.id = d[id]
    d.label = d[label]
    d.text = d[label]
    d.key = d[id]
  })
  cloneData.forEach((d: any) => {
    if (!d[pid] || !map.has(d[pid])) {
      parentids.push(d[id])
    }
  })
  const tree = cloneData.filter((father: any) => {
    const branchArr = cloneData.filter((child: any) => {
      return father[id] === child[pid]
    })
    if (branchArr.length > 0) {
      father[children] = branchArr
    } else {
      father[children] = []
    }
    return parentids.includes(father[id])
  })
  /* if (tree.length > 1) {
    tree = cloneData.filter(p => p[pid] == '').map(p => ({
      ...p,
      children: tree,
    }))
  } */
  return tree // 返回树形数据
}
