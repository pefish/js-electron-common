/** @module */
import FileUtil from '@pefish/js-util-file'
import path from 'path'
import IpcMainUtil from '../utils/ipc_main'
import * as util from "util";

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
  routes: any

  constructor() {
    this.routes = {}
  }

  desensitize (data: {}): {} {
    const temp = Object.assign({}, data)
    for (const [k, _] of Object.entries(temp)) {
      if ([`password`, `pass`, `key`, `pkey`, `token`].includes(k)) {
        temp[k] = `****`
      }
    }
    return temp
  }

  /**
   * 构建所有路由
   * @param controllersPath
   * @returns {Promise<boolean>}
   */
  buildRoute (controllersPath) {
    const filesAndDirs = FileUtil.getFilesAndDirs(controllersPath)
    for (let file of filesAndDirs.files) {
      if (!file.endsWith(`.js`) && !file.endsWith(`.ts`)) {
        continue
      }
      let name = path.basename(file)
      name = name.substring(0, name.length - 3);
      this.routes[name] = new (require(`${controllersPath}/${name}`).default)()
    }

    IpcMainUtil.onSyncCommand(async (event, cmd, args) => {
      let reply
      try {
        global.logger.info(`-----------收到同步请求 ${cmd} ${JSON.stringify(this.desensitize(args))}`)
        const [instanceName, methodName] = cmd.split(/\./)
        if (!this.routes[instanceName]) {
          IpcMainUtil.return_(event, `${cmd} nothing`)
          global.logger.info(`-----------回复同步请求 ${cmd} nothing`)
          return
        }
        const result = await this.routes[instanceName][methodName](args)
        reply = {
          succeed: true,
          data: result
        }
        IpcMainUtil.return_(event, reply)
        global.logger.info(`-----------回复同步请求 ${cmd} ${JSON.stringify(this.desensitize(reply))}`)
      } catch (err) {
        global.logger.error(util.inspect(err))
        reply = {
          succeed: false,
          error_message: err.getErrorMessage_ ? err.getErrorMessage_() : err.message
        }
        IpcMainUtil.return_(event, reply)
        global.logger.info(`-----------回复同步请求 ${cmd} ${JSON.stringify(this.desensitize(reply))}`)
      }
    })

    IpcMainUtil.onAsyncCommand(async (event, cmd, args) => {
      let reply
      try {
        global.logger.info(`-----------收到异步请求 ${cmd} ${JSON.stringify(this.desensitize(args))}`)
        const [instanceName, methodName] = cmd.split(/\./)
        if (!this.routes[instanceName]) {
          global.logger.info(`-----------回复异步请求 ${cmd} 未找到路由`)
          return
        }
        const result = await this.routes[instanceName][methodName](args)
        reply = {
          succeed: true,
          data: result
        }
        IpcMainUtil.sendAsyncCommand(event, cmd, reply)
        global.logger.info(`-----------回复异步请求 ${cmd} ${JSON.stringify(this.desensitize(reply))}`)
      } catch (err) {
        global.logger.error(util.inspect(err))
        reply = {
          succeed: false,
          error_message: err.getErrorMessage_ ? err.getErrorMessage_() : err.message
        }
        IpcMainUtil.sendAsyncCommand(event, cmd, reply)
        global.logger.info(`-----------回复异步请求 ${cmd} ${JSON.stringify(this.desensitize(reply))}`)
      }
    })
  }
}
