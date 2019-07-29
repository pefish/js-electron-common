/** @module */

import electron from 'electron'

/**
 * App工具类
 */
class AppUtil {
  static getLocale () {
    return electron.app.getLocale()
  }

  static onActivated (cb) {
    // 显示窗口时触发
    electron.app.on('activate', cb)
  }

  static onWindowAllClosed (cb) {
    electron.app.on('window-all-closed', cb)
  }

  static quit () {
    electron.app.quit()
  }

  static onReady (cb, onClosed = null) {
    electron.app.on('ready', async () => {
      try {
        await cb()
      } catch (err) {
        global.logger.error(err)
        electron.app.quit()
      }
    })
    electron.app.on('window-all-closed', async () => {
      try {
        onClosed && await onClosed()
      } catch (err) {
        global.logger.error(err)
      } finally {
        electron.app.quit()
      }
    })
  }
}

export default AppUtil
