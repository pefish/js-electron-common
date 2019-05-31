/** @module */
/**
 * 电源工具类
 */
declare class PowerUtil {
    static onSuspended(cb: any): void;
    static onResumed(cb: any): void;
    static onAc(cb: any): void;
    static onBattery(cb: any): void;
}
export default PowerUtil;
