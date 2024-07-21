/**
 * @desc 函数并行执行限制器
 * @author tarymee
 * @param {number} limit 并行执行限制个数 不传表示无限制
 */
export default class ParallelLimit {
  constructor (limit) {
    if (limit) {
      this.limit = limit
    } else {
      this.noLimit = true
    }
  }

  limit = 1

  noLimit = false

  running = 0

  taskQueue = []

  addTask (fn, ...arg) {
    const fnType = Object.prototype.toString.call(fn)
    // console.log(fnType)
    // debugger
    if (fnType === '[object Function]' || fnType === '[object AsyncFunction]') {
      let asyncFn = fn
      if (fnType === '[object Function]') {
        // 接受的 fn 必须是 anync 函数 如果是普通函数则用 async 包装
        asyncFn = async function (...arg) {
          return fn(...arg)
        }
      }
      this.taskQueue.push({
        fn: asyncFn,
        arg: arg
      })
    } else {
      console.error('[参数错误]: fn 必须为 AsyncFunction 或 Function')
    }
  }

  runTask (fn, ...arg) {
    // console.log([fn])
    // debugger
    this.addTask(fn, ...arg)
    this.run()
  }

  async run (isForceRun = false) {
    // const that = this
    if (this.taskQueue.length) {
      if (this.running < this.limit || isForceRun || this.noLimit) {
        this.running++
        const frontTask = this.taskQueue.shift()
        frontTask && frontTask.fn(...frontTask.arg).finally(() => {
          this.running--
          this.run(true)
        })
      }
    }
  }
}


// // event 事件执行器 并行执行(支持限制个数)
// eventActuator = new ParallelLimit(2)

// this.eventActuator.runTask(this.actionActuator, actionQueue, option)
