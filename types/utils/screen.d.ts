/** @module */
import electron from 'electron';
/**
 * 显示屏工具类
 */
declare class ScreenUtil {
    static getAllDisplays(): electron.Display[];
    static getPrimaryDisplay(): electron.Display;
}
export default ScreenUtil;
