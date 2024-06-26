import { reactive } from 'vue'
const assgin = (obj, newObj) => {
  for (const k in newObj) {
    obj[k] = newObj[k]
  }
  return reactive(obj)
}

export default assgin
