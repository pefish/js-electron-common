/** @module */

import electron from 'electron'

/**
 * 快捷方式工具类
 */
class ShortcutUtil {
  static register (shortcutStr, cb) {
    electron.globalShortcut.register(shortcutStr, cb)
  }
}

export default ShortcutUtil
