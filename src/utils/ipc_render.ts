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
    const result = electron.ipcRenderer.sendSync('sync_message', {
      cmd: `${controller}.${method}`,
      args
    })
    if (result[`succeed`] !== true) {
      alert(result[`error_message`])
      throw new ErrorHelper(result[`error_message`])
    }
    return result[`data`]
  }

  static async sendAsyncCommand (controller, method, args) {
    const cmd = `${controller}.${method}`
    return new Promise((resolve, reject) => {
      electron.ipcRenderer.once(`async_message_${cmd}`, (event, result) => {
        if (result[`succeed`] !== true) {
          alert(result[`error_message`])
          reject(new ErrorHelper(result[`error_message`]))
        }
        resolve(result[`data`])
      })

      electron.ipcRenderer.send('async_message', {
        cmd,
        args
      })
    })
  }
}

export default IpcRendererUtil
