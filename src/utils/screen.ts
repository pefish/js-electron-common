/** @module */

import electron from 'electron'

/**
 * 显示屏工具类
 */
class ScreenUtil {
  static getAllDisplays () {
    return electron.screen.getAllDisplays()
  }

  static getPrimaryDisplay () {
    return electron.screen.getPrimaryDisplay()
  }
}

export default ScreenUtil
