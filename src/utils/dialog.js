/** @module */

import electron from 'electron'

/**
 * 对话框工具类
 */
class DialogUtil {
  static showOpenFileDialog (multi = false) {
    const properties = [
      'openFile'
    ]
    multi === true && properties.push('multiSelections')
    return electron.remote.dialog.showOpenDialog({
      properties: properties
    })
  }

  static showOpenDirDialog (multi = false) {
    const properties = [
      'openDirectory'
    ]
    multi === true && properties.push('multiSelections')
    return electron.remote.dialog.showOpenDialog({
      properties: properties
    })
  }

  static showOpenDialog (properties) {
    return electron.remote.dialog.showOpenDialog({
      properties: properties
    })
  }
}

export default DialogUtil
