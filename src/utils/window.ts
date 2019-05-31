import electron from "electron"
import FileUtil from '@pefish/js-util-file'
import path from 'path'

export default class WindowUtil {
  static openNewWindow (windowName, opts, dev = false) {
    const window = new electron.BrowserWindow(opts)
    window.loadURL(`file://${path.join(FileUtil.getStartFilePath(), `lib/pages/${windowName}.html`)}`)
    dev === true && window.webContents.openDevTools()
    window.show()
    return window
  }
}
