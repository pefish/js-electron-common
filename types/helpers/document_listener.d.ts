/** @module */
/**
 * html文档监听器
 */
declare class DocumentListener {
    _document: any;
    constructor(document: any);
    onDragged(onReceived?: any): void;
}
export default DocumentListener;
