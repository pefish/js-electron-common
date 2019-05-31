/** @module */
/**
 * 对话框工具类
 */
declare class DialogUtil {
    static showOpenFileDialog(multi?: boolean): string[];
    static showOpenDirDialog(multi?: boolean): string[];
    static showOpenDialog(properties: any): string[];
}
export default DialogUtil;
