/** @module */
import FileUtil from '@pefish/js-util-file'
import path from 'path'
import IpcMainUtil from '../utils/ipc_main'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any;
    }
  }
}

/**
 * electron路由工厂类
 * @private
 */
export default class ElectronRouteFactory {
  _routes: any

  constructor() {
    this._routes = {}
  }

  /**
   * 构建所有路由
   * @param controllersPath
   * @returns {Promise<boolean>}
   */
  buildRoute (controllersPath) {
    const filesAndDirs = FileUtil.getFilesAndDirs(controllersPath)
    for (let file of filesAndDirs.files) {
      if (!file.endsWith(`.js`)) {
        continue
      }
      const name = path.basename(file, '.js')
      this._routes[name] = new (require(`${controllersPath}/${name}`).default)()
    }

    IpcMainUtil.onSyncCommand(async (event, cmd, args) => {
      let reply
      try {
        global.logger.info(`-----------收到同步请求 ${cmd} ${JSON.stringify(args)}`)
        const [instanceName, methodName] = cmd.split(/\./)
        if (!this._routes[instanceName]) {
          IpcMainUtil.return_(event, `${cmd} nothing`)
          global.logger.info(`-----------回复同步请求 ${cmd} nothing`)
          return
        }
        const result = await this._routes[instanceName][methodName](args)
        reply = {
          succeed: true,
          data: result
        }
        IpcMainUtil.return_(event, reply)
        global.logger.info(`-----------回复同步请求 ${cmd} ${JSON.stringify(reply)}`)
      } catch (err) {
        global.logger.error(err)
        reply = {
          succeed: false,
          error_message: err.getErrorMessage ? err.getErrorMessage() : `内部错误`
        }
        IpcMainUtil.return_(event, reply)
        global.logger.info(`-----------回复同步请求 ${cmd} ${JSON.stringify(reply)}`)
      }
    })

    IpcMainUtil.onAsyncCommand(async (event, cmd, args) => {
      let reply
      try {
        global.logger.info(`-----------收到异步请求 ${cmd} ${JSON.stringify(args)}`)
        const [instanceName, methodName] = cmd.split(/\./)
        if (!this._routes[instanceName]) {
          global.logger.info(`-----------回复异步请求 ${cmd} 未找到路由`)
          return
        }
        const result = await this._routes[instanceName][methodName](args)
        reply = {
          succeed: true,
          data: result
        }
        IpcMainUtil.sendAsyncCommand(event, cmd, reply)
        global.logger.info(`-----------回复异步请求 ${cmd} ${JSON.stringify(reply)}`)
      } catch (err) {
        global.logger.error(err)
        reply = {
          succeed: false,
          error_message: err.getErrorMessage ? err.getErrorMessage() : `内部错误`
        }
        IpcMainUtil.sendAsyncCommand(event, cmd, reply)
        global.logger.info(`-----------回复异步请求 ${cmd} ${JSON.stringify(reply)}`)
      }
    })
  }
}