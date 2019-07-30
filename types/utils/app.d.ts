/** @module */
import electron from 'electron';
/**
 * App工具类
 */
declare class AppUtil {
    static getLocale(): string;
    static onActivated(cb: any): void;
    static onWindowAllClosed(cb: any): void;
    static quit(): void;
    static onReady(cb: any, onClosed?: any): void;
    static getMainWindow(windowOptions?: {}, appMenuArr?: []): electron.BrowserWindow;
}
export default AppUtil;
