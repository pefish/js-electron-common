/** @module */
import electron from 'electron'

/**
 * 右键菜单
 */
class ContextMenu {

  _menu: any

  constructor () {
    this._menu = new electron.remote.Menu()
  }

  append (props) {
    this._menu.append(new electron.remote.MenuItem(props))
  }

  install () {
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      this._menu.popup(electron.remote.getCurrentWindow())
    }, false)
  }
}

export default ContextMenu
