/** @module */
import FileUtil from '@pefish/js-util-file'
import path from 'path'
import IpcMainUtil from '../utils/ipc_main'
import * as util from "util";
import DesensitizeUtil from '@pefish/js-util-desensitize'
import { net } from 'electron';
import HttpRequestUtil from '@pefish/js-util-httprequest';

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

  /**
   * 构建所有路由
   * @param controllersPath
   * @returns {Promise<boolean>}
   */
  async buildRoute (controllersPath) {
    const filesAndDirs = FileUtil.getFilesAndDirs(controllersPath)
    for (let file of filesAndDirs.files) {
      if (!file.endsWith(`.js`) && !file.endsWith(`.ts`)) {
        continue
      }
      let name = path.basename(file)
      name = name.substring(0, name.length - 3);
      this.routes[name] = new (require(`${controllersPath}/${name}`).default)()
      this.routes[name].init && await this.routes[name].init()
    }
    this.routes[`net`] = new NetClass()
    this.routes[`net`].init && await this.routes[`net`].init()

    IpcMainUtil.onSyncCommand(async (event, cmd, args) => {
      let reply
      try {
        global.logger.info(`-----------收到同步请求 ${cmd} ${DesensitizeUtil.desensitizeObjectToString(args)}`)
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
        global.logger.info(`-----------回复同步请求 ${cmd} ${DesensitizeUtil.desensitizeObjectToString(reply)}`)
      } catch (err) {
        global.logger.error(util.inspect(err))
        reply = {
          succeed: false,
          error_message: err.getErrorMessage_ ? err.getErrorMessage_() : err.message
        }
        IpcMainUtil.return_(event, reply)
        global.logger.info(`-----------回复同步请求 ${cmd} ${DesensitizeUtil.desensitizeObjectToString(reply)}`)
      }
    })

    IpcMainUtil.onAsyncCommand(async (event, cmd, args) => {
      let reply
      try {
        global.logger.info(`-----------收到异步请求 ${cmd} ${DesensitizeUtil.desensitizeObjectToString(args)}`)
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
        global.logger.info(`-----------回复异步请求 ${cmd} ${DesensitizeUtil.desensitizeObjectToString(reply)}`)
      } catch (err) {
        global.logger.error(util.inspect(err))
        reply = {
          succeed: false,
          error_message: err.getErrorMessage_ ? err.getErrorMessage_() : err.message
        }
        IpcMainUtil.sendAsyncCommand(event, cmd, reply)
        global.logger.info(`-----------回复异步请求 ${cmd} ${DesensitizeUtil.desensitizeObjectToString(reply)}`)
      }
    })
  }
}

class NetClass {
  async httpGet (args: {
    url: string,
    opts: {[x: string]: any},
  }) {
    return HttpRequestUtil.get(args.url, args.opts)
  }

  async httpPost (args: {
    url: string,
    opts: {[x: string]: any},
  }) {
    return HttpRequestUtil.post(args.url, args.opts)
  }
}
