/** @module */

/**
 * session工具类
 */
class SessionUtil {
  static getUserAgent (win) {
    return win.webContents.session.getUserAgent()
  }
}

export default SessionUtil
