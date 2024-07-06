const isIOS = () => {
  const ua = navigator.userAgent
  return /(iPhone|iPad|iPod|IOS)/i.test(ua)
}

// 生成唯一id
const getUniqueid = () => {
  const random = Math.ceil(Math.random() * 100000)
  // TODO：生成的id不能以0开头，在数据库存储转换长整型会被消除，导致唯一编码错误存储
  // TODO: 不能与服务端返回的idarray在未来产生重叠，用9开头（应该够用许多年了？）
  return `9${Date.now()}${random}`
}

export {
  isIOS,
  getUniqueid
}
