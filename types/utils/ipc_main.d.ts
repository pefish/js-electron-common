/** @module */
/**
 * 主窗口ipc工具类
 */
declare class IpcMainUtil {
    static onSyncCommand(cb: any): void;
    static onAsyncCommand(cb: any): void;
    static sendAsyncCommand(event: any, cmd: any, args: any): void;
    static return_(event: any, datas: any): void;
}
export default IpcMainUtil;
