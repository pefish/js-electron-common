/** @module */

import electron from 'electron'
import ErrorHelper from 'p-js-error'

/**
 * 副窗口ipc工具类
 */
class IpcRendererUtil {
  static sendSyncMessageForResult (msg) {
    return electron.ipcRenderer.sendSync('sync_message', msg)
  }

  static sendAsyncMessage (msg) {
    electron.ipcRenderer.send('async_message', msg)
  }

  static onAsyncMessage (cb) {
    electron.ipcRenderer.on('async_message', (event, args) => {
      cb(event, args)
    })
  }

  static sendSyncCommandForResult (controller, cmd, args) {
    const result = electron.ipcRenderer.sendSync('sync_message', {
      cmd: `${controller}.${cmd}`,
      args
    })
    if (result[`succeed`] !== true) {
      alert(result[`error_message`])
      throw new ErrorHelper(result[`error_message`])
    }
    return result[`data`]
  }

  static sendAsyncCommand (controller, cmd, args) {
    electron.ipcRenderer.send('async_message', {
      cmd: `${controller}.${cmd}`,
      args
    })
  }

  static onAsyncCommand (cb) {
    electron.ipcRenderer.on('async_message', (event, args) => {
      cb(event, args['cmd'], args['args'])
    })
  }
}

export default IpcRendererUtil
