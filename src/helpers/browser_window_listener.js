/** @module */

/**
 * 浏览器窗口监听器
 */
class BrowserWindowListener {
  constructor (win) {
    this._win = win
  }

  onFileWillDownload (saveToFile = null, onReceived = null, onInterrupted = null, onPaused = null, onFailed = null, onSucceed = null) {
    this._win.webContents.session.on('will-download', (event, item, webContents) => {
      saveToFile && item.setSavePath(saveToFile)  // 可以阻止打开保存对话框

      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          onInterrupted && onInterrupted(item)
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            onPaused && onPaused(item)
          } else {
            onReceived && onReceived(item)
          }
        }
      })
      item.once('done', (event, state) => {
        if (state === 'completed') {
          onSucceed && onSucceed(item)
        } else {
          onFailed && onFailed(item)
        }
      })
    })
  }
}

export default BrowserWindowListener
