/** @module */

import electron from 'electron'
import ErrorHelper from '@pefish/js-error'
import HttpRequestUtil, { RequestOpts } from '@pefish/js-util-httprequest';

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
  static sendSyncCommandForResult (controller: string, method: string, args: {[x: string]: any}, errCb: (errMsg: string) => void = null): any {
    const sendEventName = `sync_message`
    const datas = {
      cmd: `${controller}.${method}`,
      args
    }
    const result = electron.ipcRenderer.sendSync(sendEventName, datas)
    if (result[`succeed`] !== true) {
      errCb ? errCb(result[`error_message`]) : alert(result[`error_message`])
      throw new ErrorHelper(result[`error_message`])
    }
    return result[`data`]
  }

  static async sendAsyncCommand (controller: string, method: string, args: {[x: string]: any}, errCb?: (errMsg: string) => void): Promise<any> {
    const cmd = `${controller}.${method}`
    return new Promise((resolve, reject) => {
      const receiveEventName = `async_message_${cmd}`
      electron.ipcRenderer.once(receiveEventName, (event, result) => {
        if (result[`succeed`] !== true) {
          errCb ? errCb(result[`error_message`]) : alert(result[`error_message`])
          reject(new ErrorHelper(result[`error_message`]))
        }
        resolve(result[`data`])
      })

      const sendEventName = `async_message`
      const datas = {
        cmd,
        args
      }
      electron.ipcRenderer.send(sendEventName, datas)
    })
  }

  static async httpGet (url: string, opts?: RequestOpts, errCb?: (errMsg: string) => void) {
    return await this.sendAsyncCommand(`net`, `httpGet`, {
      url,
      opts,
    }, errCb)
  }

  static async httpPost (url: string, opts?: RequestOpts, errCb?: (errMsg: string) => void) {
    return await this.sendAsyncCommand(`net`, `httpPost`, {
      url,
      opts,
    }, errCb)
  }
}

export default IpcRendererUtil
