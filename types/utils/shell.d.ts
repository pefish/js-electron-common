/** @module */
/**
 * shell工具类
 */
declare class ShellUtil {
    static openExternal(url: any): void;
    static showItemInFolder(fullPath: any): void;
    static moveItemToTrash(fullPath: any): void;
}
export default ShellUtil;
