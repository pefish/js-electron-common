/**
 * 右键菜单
 */
declare class ContextMenu {
    _menu: any;
    constructor();
    append(props: any): void;
    install(): void;
}
export default ContextMenu;
