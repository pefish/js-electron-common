/** @module */

/**
 * 错误帮助类
 * @extends Error
 */
class ErrorHelper extends Error {
  constructor (errorMessage, errorCode = 0, errorStorage = null, err = null) {
    // 抛出ErrorHelper，但catch到的是Error对象
    const message = {
      errorMessage,
      errorCode,
      errorStorage
    }
    err && logger.error('ERROR: ', err.message)
    super(JSON.stringify(message))
    this.setErrorCode(errorCode)
    this.setErrorMessage(errorMessage)
    errorStorage && this.setErrorStorage(errorStorage)
  }
}

export default ErrorHelper
