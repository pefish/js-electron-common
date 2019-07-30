/** @module */

import electron from 'electron'
import path from 'path'
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import * as util from "util";

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
        global.logger.error(util.inspect(err))
        electron.app.quit()
      }
    })
    electron.app.on('window-all-closed', async () => {
      try {
        onClosed && await onClosed()
      } catch (err) {
        global.logger.error(util.inspect(err))
      } finally {
        electron.app.quit()
      }
    })
  }

  static getMainWindow (windowOptions: {} = null, appMenuArr: [] = null): electron.BrowserWindow {
    const window = new electron.BrowserWindow({
      width: 1000,
      height: 600,
      resizable: false,
      icon: path.join(__dirname, 'icon.icns'),
      webPreferences: {
        nodeIntegration: true
      },
      ...windowOptions,
    })

    const menuTemplate = appMenuArr || [
      {
        label: 'Edit',
        submenu: [
          { label: 'Undo', accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: 'Redo', accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: 'Cut', accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: 'Copy', accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: 'Paste', accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: 'Select All', accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
      },
      {
        label: 'Help',
        role: 'help',
        id: 'help',
        submenu: [
          {
            label: '开发者选项',
            click: () => {
              window.webContents.openDevTools()
            }
          },
          { type: "separator" },
          {
            label: 'Reload',
            click: () => {
              window.reload()
            }
          },
        ]
      },
    ]
    const menu = electron.Menu.buildFromTemplate(menuTemplate as MenuItemConstructorOptions[])
    electron.Menu.setApplicationMenu(menu)
  
    const selectionMenu = electron.Menu.buildFromTemplate([
      {role: 'copy'},
      {type: 'separator'},
      {role: 'selectall'},
    ])
    const inputMenu = electron.Menu.buildFromTemplate([
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {type: 'separator'},
      {role: 'selectall'},
    ])
    window.webContents.on('context-menu', (e, props) => {
      const { selectionText, isEditable } = props;
      if (isEditable) {
        inputMenu.popup(window as any);
      } else if (selectionText && selectionText.trim() !== '') {
        selectionMenu.popup(window as any);
      }
    })
  
    return window
  }
}

export default AppUtil
