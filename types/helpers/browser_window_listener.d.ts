/** @module */
/**
 * 浏览器窗口监听器
 */
declare class BrowserWindowListener {
    _win: any;
    constructor(win: any);
    onFileWillDownload(saveToFile?: any, onReceived?: any, onInterrupted?: any, onPaused?: any, onFailed?: any, onSucceed?: any): void;
}
export default BrowserWindowListener;
