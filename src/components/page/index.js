import React, { memo } from 'react';
import './index.scss';
export var PageHead = function (_a) {
    var _b = _a.title, title = _b === void 0 ? 'Title' : _b, option = _a.option;
    return (React.createElement("header", { className: 'pro-page_container_header' },
        React.createElement("div", null, title),
        React.createElement("div", null, typeof option === 'function' ? option() : option)));
};
var Index = function (_a) {
    var children = _a.children, head = _a.head, title = _a.title, option = _a.option, _b = _a.padding, padding = _b === void 0 ? 20 : _b;
    return (React.createElement("section", { className: 'pro-page_container' },
        head ? (typeof head === 'function' ? (head()) : (head)) : (React.createElement(PageHead, { title: title, option: option })),
        React.createElement("div", { style: { padding: padding + "px" } }, children)));
};
export default memo(Index);
//# sourceMappingURL=index.js.map