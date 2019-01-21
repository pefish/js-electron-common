/** @module */
import fs from 'fs'
import path from 'path'

/**
 * file工具类
 */
export default class FileUtil {
  static getFilesAndDirs (filePath) {
    const result = {
      dirs: [],
      files: []
    }
    const temp = fs.readdirSync(filePath)
    temp.forEach((filenameOrDirname) => {
      let fileOrPath = path.join(filePath, filenameOrDirname)
      let info = fs.statSync(fileOrPath)
      if (info.isDirectory()) {
        result.dirs.push(filenameOrDirname)
      } else {
        result.files.push(filenameOrDirname)
      }
    })
    return result
  }

  static getExtName (filename, firstPoint = false) {
    if (FileUtil.isDirectory(filename)) {
      return null
    }

    if (firstPoint === true) {
      const basename = path.basename(filename)
      return basename.substring(basename.indexOf('.') + 1, basename.length)
    } else {
      const temp = path.extname(filename)
      return temp.substring(1, temp.length)
    }
  }

  static existsSync (pathOrFilePath) {
    try {
      fs.accessSync(pathOrFilePath, fs.F_OK)
    } catch (e) {
      return false
    }
    return true
  }

  static mkdirSync (path_, recursive = true) {
    if (recursive) {
      if (FileUtil.existsSync(path_)) {
        return true
      } else {
        if (FileUtil.mkdirSync(path.dirname(path_))) {
          fs.mkdirSync(path_)
          return true
        }
      }
    } else {
      fs.mkdirSync(path_)
      return true
    }
  }

  static loadFromJsonFile (jsonFile) {
    if (!FileUtil.existsSync(jsonFile)) {
      return null
    }
    return JSON.parse(fs.readFileSync(jsonFile))
  }

  /**
   * 同步写
   * @param filepath
   * @param data {string | object}
   * @returns {*}
   */
  static writeSync (filepath, data) {
    if (typeof data !== 'string') {
      data = JSON.stringify(data)
    }
    FileUtil.mkdirSync(path.dirname(filepath))
    return fs.writeFileSync(filepath, data)
  }

  /**
   * 同步读
   * @param filepath
   * @returns {*}
   */
  static readSync (filepath) {
    return fs.readFileSync(filepath)
  }

  /**
   * 获取启动文件所处的绝对路径
   */
  static getStartFilePath () {
    return path.dirname(require.main.filename)
  }

  /**
   * 获取工作绝对路径
   */
  static getWorkPath () {
    return process.cwd()
  }

  /**
   * 强制删除文件或目录
   * @param filenameOrPath {string} 绝对路径
   */
  static remove (filenameOrPath) {
    const ShellHelper = require('../helpers/shell')
    new ShellHelper(false).execSyncInSilent(`rm -rf ${filenameOrPath}`)
  }

  static isDirectory (filenameOrPath) {
    let result = false
    try {
      result = fs.lstatSync(filenameOrPath).isDirectory()
    } catch (err) {

    }
    return result
  }

  static isFile (filenameOrPath) {
    let result = false
    try {
      result = fs.lstatSync(filenameOrPath).isFile()
    } catch (err) {

    }
    return result
  }

  /**
   * 获取相对于工作目录的绝对路径
   * @param filenameOrPath
   */
  static getAbsolutePath (filenameOrPath) {
    return path.resolve(filenameOrPath)
  }

  /**
   * 获取模块的main文件(package.json中的main)的绝对路径
   * @param moduleName
   * @returns {String}
   */
  static getAbsolutePathOfModule (moduleName) {
    return require.resolve(moduleName)
  }
}
