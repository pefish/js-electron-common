/** @module */
import electron, { BrowserWindowConstructorOptions } from 'electron';
import { Log4js } from '@pefish/js-helper-logger';
declare class App {
    dataDir: string;
    logger: Log4js;
    packageInfo: {
        [x: string]: any;
    };
    config: {
        [x: string]: any;
    };
    isDebug: boolean;
    mainWindow: electron.BrowserWindow;
    private routes;
    private windowOptions;
    private appMenuArr;
    private prodUri;
    private debugUri;
    constructor(packageInfo: {
        [x: string]: any;
    }, config: {
        [x: string]: any;
    }, isDebug?: boolean);
    appendWindowOptions(windowOptions: BrowserWindowConstructorOptions): void;
    appendAppMenu(appMenu: {
        [x: string]: any;
    }): void;
    start(willStartFunc: () => Promise<void>, controllerPath: string, loadPage?: string, onClosed?: () => Promise<void>): void;
    buildRoute(controllersPath: string): Promise<void>;
    getMainWindow(): electron.BrowserWindow;
}
export default App;
