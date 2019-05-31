/** @module */

import electron from 'electron'
import ErrorHelper from '@pefish/js-error'

/**
 * Cookie工具类
 */
class CookieUtil {
  /**
   * 可以获取app访问过的所有网站的cookie，dom-ready之后再读
   * @param filter
   * @returns {Promise}
   */
  static getCookies (filter = null) {
    return new Promise((resolve, reject) => {
      electron.session.defaultSession.cookies.get(filter || {}, (err, cookies) => {
        if (err) {
          reject(new ErrorHelper('失败', 0, null, err))
        } else {
          resolve(cookies)
        }
      })
    })
  }

  static setCookie (data) {
    return new Promise((resolve, reject) => {
      electron.session.defaultSession.cookies.set(data, (err) => {
        if (err) {
          reject(new ErrorHelper('失败', 0, null, err))
        } else {
          resolve(true)
        }
      })
    })
  }

  static remove (url, name) {
    return new Promise((resolve, reject) => {
      electron.session.defaultSession.cookies.remove(url, name, (err) => {
        if (err) {
          reject(new ErrorHelper('失败', 0, null, err))
        } else {
          resolve(true)
        }
      })
    })
  }

  static flushStore () {
    return new Promise((resolve, reject) => {
      electron.session.defaultSession.cookies.flushStore((err) => {
        if (err) {
          reject(new ErrorHelper('失败', 0, null, err))
        } else {
          resolve(true)
        }
      })
    })
  }
}

export default CookieUtil
