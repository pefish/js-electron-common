/** @module */

import electron from 'electron'
import OpenDialogOptions = Electron.OpenDialogOptions;

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
    } as OpenDialogOptions)
  }

  static showOpenDirDialog (multi = false) {
    const properties = [
      'openDirectory'
    ]
    multi === true && properties.push('multiSelections')
    return electron.remote.dialog.showOpenDialog({
      properties: properties
    } as OpenDialogOptions)
  }

  static showOpenDialog (properties) {
    return electron.remote.dialog.showOpenDialog({
      properties: properties
    })
  }
}

export default DialogUtil
