/** @module */
import { RequestOpts } from '@pefish/js-util-httprequest';
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
    }, errCb?: (errMsg: string) => void): any;
    static sendAsyncCommand(controller: string, method: string, args: {
        [x: string]: any;
    }, errCb?: (errMsg: string) => void): Promise<any>;
    static httpGet(url: string, opts?: RequestOpts, errCb?: (errMsg: string) => void): Promise<any>;
    static httpPost(url: string, opts?: RequestOpts, errCb?: (errMsg: string) => void): Promise<any>;
}
export default IpcRendererUtil;
