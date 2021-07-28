import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
expect.extend({
    toBeInTheDocument: function (element) {
        var _this = this;
        if (typeof element === 'function') {
            try {
                element = element();
            }
            catch (e) {
                return {
                    pass: false,
                    message: function () { return "element" + (!_this.isNot ? ' could not be ' : ' ') + "found in the document"; },
                };
            }
        }
        return toBeInTheDocument(element);
    },
});
//# sourceMappingURL=matchers.setup.js.map