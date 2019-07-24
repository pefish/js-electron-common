declare global {
    namespace NodeJS {
        interface Global {
            logger: any;
        }
    }
}
import BrowserWindowListenerHelper from './helpers/browser_window_listener';
import ContextMenuHelper from './helpers/context_menu';
import DocumentListenerHelper from './helpers/document_listener';
import ElectronRouteFactoryHelper from './helpers/electron_route_factory';
import AppUtil from './utils/app';
import ClipboardUtil from './utils/clipboard';
import CookieUtil from './utils/cookie';
import DialogUtil from './utils/dialog';
import IpcMainUtil from './utils/ipc_main';
import IpcRenderUtil from './utils/ipc_render';
import PowerUtil from './utils/power';
import ScreenUtil from './utils/screen';
import SessionUtil from './utils/session';
import ShellUtil from './utils/shell';
import ShortcutUtil from './utils/shortcut';
import WindowUtil from './utils/window';
export { BrowserWindowListenerHelper, ContextMenuHelper, DocumentListenerHelper, ElectronRouteFactoryHelper, AppUtil, ClipboardUtil, CookieUtil, DialogUtil, IpcMainUtil, IpcRenderUtil, PowerUtil, ScreenUtil, SessionUtil, ShellUtil, ShortcutUtil, WindowUtil, };
