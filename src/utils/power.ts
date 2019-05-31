/** @module */

import electron from 'electron'

/**
 * 电源工具类
 */
class PowerUtil {
  static onSuspended (cb) {
    electron.powerMonitor.on('suspend', cb)
  }

  static onResumed (cb) {
    electron.powerMonitor.on('resume', cb)
  }

  static onAc (cb) {
    electron.powerMonitor.on('on-ac', cb)
  }

  static onBattery (cb) {
    electron.powerMonitor.on('on-battery', cb)
  }
}

export default PowerUtil
