/** @module */

import electron from 'electron'

/**
 * shell工具类
 */
class ShellUtil {
  static openExternal (url) {
    electron.shell.openExternal(url)
  }

  static showItemInFolder (fullPath) {
    electron.shell.showItemInFolder(fullPath)
  }

  static moveItemToTrash (fullPath) {
    electron.shell.moveItemToTrash(fullPath)
  }
}

export default ShellUtil
