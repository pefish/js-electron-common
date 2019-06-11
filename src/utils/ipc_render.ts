/** @module */

import electron from 'electron'
import ErrorHelper from '@pefish/js-error'

/**
 * 副窗口ipc工具类
 */
class IpcRendererUtil {
  /**
   * 会阻塞UI进程
   * @param controller
   * @param method
   * @param args
   * @returns {*}
   */
  static sendSyncCommandForResult (controller, method, args) {
    const sendEventName = `sync_message`
    const datas = {
      cmd: `${controller}.${method}`,
      args
    }
    console.log(`sync send. event: ${sendEventName}`)
    console.log(`datas`, datas)
    const result = electron.ipcRenderer.sendSync(sendEventName, datas)
    console.log(`sync receive.`)
    console.log(`result`, result)
    if (result[`succeed`] !== true) {
      alert(result[`error_message`])
      throw new ErrorHelper(result[`error_message`])
    }
    return result[`data`]
  }

  static async sendAsyncCommand (controller, method, args) {
    const cmd = `${controller}.${method}`
    return new Promise((resolve, reject) => {
      const receiveEventName = `async_message_${cmd}`
      electron.ipcRenderer.once(receiveEventName, (event, result) => {
        console.log(`async receive. listenEvent: ${receiveEventName}, event: ${event}`)
        console.log(`result`, result)
        if (result[`succeed`] !== true) {
          alert(result[`error_message`])
          reject(new ErrorHelper(result[`error_message`]))
        }
        resolve(result[`data`])
      })

      const sendEventName = `async_message`
      const datas = {
        cmd,
        args
      }
      console.log(`async send. event: ${sendEventName}`)
      console.log(`datas`, datas)
      electron.ipcRenderer.send(sendEventName, datas)
    })
  }
}

export default IpcRendererUtil
