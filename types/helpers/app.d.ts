/** @module */
import electron, { BrowserWindowConstructorOptions } from 'electron';
import { Log4js } from '@pefish/js-helper-logger';
declare class App {
    dataDir: string;
    logger: Log4js;
    packageInfo: {
        [x: string]: any;
    };
    constructor(packageInfo: {
        [x: string]: any;
    });
    start(willStartFunc: () => Promise<void>, controllerPath: string, webFilePath: string, config: {
        [x: string]: any;
    }, windowOptions?: BrowserWindowConstructorOptions, appMenuArr?: any[], onClosed?: () => Promise<void>): void;
    getMainWindow(windowOptions?: BrowserWindowConstructorOptions, appMenuArr?: any[]): electron.BrowserWindow;
}
export default App;
