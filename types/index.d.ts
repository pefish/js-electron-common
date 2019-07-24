declare global {
    namespace NodeJS {
        interface Global {
            logger: any;
        }
    }
}
export * from './helpers/browser_window_listener';
export * from './helpers/context_menu';
export * from './helpers/document_listener';
export * from './helpers/electron_route_factory';
export * from './utils/app';
export * from './utils/clipboard';
export * from './utils/cookie';
export * from './utils/dialog';
export * from './utils/ipc_main';
export * from './utils/ipc_render';
export * from './utils/power';
export * from './utils/screen';
export * from './utils/session';
export * from './utils/shell';
export * from './utils/shortcut';
export * from './utils/window';
