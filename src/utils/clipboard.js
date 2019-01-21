/** @module */

import electron from 'electron'

/**
 * 剪切板工具类
 */
class ClipBoardUtil {
  static writeText (text) {
    electron.clipboard.writeText(text)
  }

  static readText () {
    return electron.clipboard.readText()
  }
}

export default ClipBoardUtil
