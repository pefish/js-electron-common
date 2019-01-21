/** @module */
import electron from 'electron'

const { Menu, MenuItem } = electron.remote

/**
 * 右键菜单
 */
class ContextMenu {

  constructor () {
    this._menu = new Menu()
  }

  append (props) {
    this._menu.append(new MenuItem(props))
  }

  install () {
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      this._menu.popup(electron.remote.getCurrentWindow())
    }, false)
  }
}

export default ContextMenu
