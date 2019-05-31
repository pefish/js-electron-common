/** @module */
/**
 * Cookie工具类
 */
declare class CookieUtil {
    /**
     * 可以获取app访问过的所有网站的cookie，dom-ready之后再读
     * @param filter
     * @returns {Promise}
     */
    static getCookies(filter?: any): Promise<unknown>;
    static setCookie(data: any): Promise<unknown>;
    static remove(url: any, name: any): Promise<unknown>;
    static flushStore(): Promise<unknown>;
}
export default CookieUtil;
