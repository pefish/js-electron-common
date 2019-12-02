/** @module */

import electron, { BrowserWindowConstructorOptions } from 'electron'
import path from 'path'
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import * as util from "util";
import { Log4js } from '@pefish/js-helper-logger'
import os from 'os'
import FileUtil from '@pefish/js-util-file'
import ElectronRouteFactoryHelper from './electron_route_factory';

class App {
  dataDir: string
  logger: Log4js
  packageInfo: { [x: string]: any }

  constructor(packageInfo: { [x: string]: any }) {
    this.packageInfo = packageInfo
    const homedir = os.homedir()
    this.logger = new Log4js(this.packageInfo.name, `${homedir}/.${this.packageInfo.name}/log`)
    this.dataDir = `${homedir}/.${packageInfo.name}/data`
    FileUtil.mkdirSync(this.dataDir)
  }

  start(
    willStartFunc: () => Promise<void>,
    controllerPath: string,
    webFilePath: string,
    config: { [x: string]: any },
    windowOptions: BrowserWindowConstructorOptions = {
      width: 1000,
      height: 600,
      resizable: false,
      icon: path.join(__dirname, 'icon.icns'),
      webPreferences: {
        nodeIntegration: true
      },
    },
    appMenuArr: any[] = [],
    onClosed: () => Promise<void> = null,
  ) {
    electron.app.on('ready', async () => {
      try {
        this.logger.info(`starting ...`)
        new ElectronRouteFactoryHelper().buildRoute(controllerPath)
        await willStartFunc()
        const mainWindow = this.getMainWindow(windowOptions, appMenuArr)
        let url = 'file://' + webFilePath
        if (config.env !== 'prod') {
          url = `http://localhost:3000`
        }
        this.logger.info(`url: ${url}`)
        mainWindow.loadURL(url + `#/index`)
        mainWindow.show()
        this.logger.info(`started !!!`)
      } catch (err) {
        this.logger.error(util.inspect(err))
        electron.app.quit()
      }
    })
    electron.app.on('window-all-closed', async () => {
      try {
        onClosed && await onClosed()
      } catch (err) {
        this.logger.error(util.inspect(err))
      } finally {
        electron.app.quit()
      }
    })
  }

  getMainWindow(windowOptions: BrowserWindowConstructorOptions = {}, appMenuArr: any[] = []): electron.BrowserWindow {
    const window = new electron.BrowserWindow(windowOptions)

    const menuTemplate = [
      {
        label: this.packageInfo.name,
        submenu: [
          {
            label: 'About ...',
            click: () => {
              electron.dialog.showMessageBox({
                message: this.packageInfo.description
              })
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Version ...',
            click: () => {
              electron.dialog.showMessageBox({
                message: `v${this.packageInfo.version}`
              })
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            click: () => {
              electron.app.quit();
            }
          }
        ]
      },
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
      ...appMenuArr,
    ]
    const menu = electron.Menu.buildFromTemplate(menuTemplate as MenuItemConstructorOptions[])
    electron.Menu.setApplicationMenu(menu)

    const selectionMenu = electron.Menu.buildFromTemplate([
      { role: 'copy' },
      { type: 'separator' },
      { role: 'selectall' },
    ])
    const inputMenu = electron.Menu.buildFromTemplate([
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { type: 'separator' },
      { role: 'selectall' },
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

export default App
