/** @module */
/**
 * 副窗口ipc工具类
 */
declare class IpcRendererUtil {
    /**
     * 会阻塞UI进程
     * @param controller
     * @param method
     * @param args
     * @returns {*}
     */
    static sendSyncCommandForResult(controller: any, method: any, args: any): any;
    static sendAsyncCommand(controller: any, method: any, args: any): Promise<unknown>;
}
export default IpcRendererUtil;
