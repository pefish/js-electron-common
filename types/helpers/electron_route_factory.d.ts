declare global {
    namespace NodeJS {
        interface Global {
            logger: any;
        }
    }
}
/**
 * electron路由工厂类
 * @private
 */
export default class ElectronRouteFactory {
    routes: any;
    constructor();
    desensitize(data: {}): {};
    /**
     * 构建所有路由
     * @param controllersPath
     * @returns {Promise<boolean>}
     */
    buildRoute(controllersPath: any): void;
}
