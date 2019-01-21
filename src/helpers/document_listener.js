/** @module */

/**
 * html文档监听器
 */
class DocumentListener {
  constructor (document) {
    this._document = document
  }

  onDragged (onReceived = null) {
    this._document.addEventListener('drop', (e) => {
      e.preventDefault()
      e.stopPropagation()

      for (let f of e.dataTransfer.files) {
        onReceived && onReceived(f.path)
      }
    })

    this._document.addEventListener('dragover', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })
  }
}


export default DocumentListener
