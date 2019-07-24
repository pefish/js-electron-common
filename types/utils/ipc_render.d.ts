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
    static sendSyncCommandForResult(controller: string, method: string, args: {
        [x: string]: any;
    }): any;
    static sendAsyncCommand(controller: string, method: string, args: {
        [x: string]: any;
    }): Promise<any>;
}
export default IpcRendererUtil;
