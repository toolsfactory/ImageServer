"use strict";
const Url = require('url');
class UrlParser {
    constructor(sizes) {
        this.validSizes = sizes;
    }
    parseUrl(url) {
        this.initialize(url);
        let pathitems = Url.parse(this.initialUrl, true).path.split('/').slice(1);
        if (!this.doPathValidation(pathitems)) {
            return;
        }
        let fileparts = pathitems[2].split('.');
        if (!this.doFileValidation(fileparts)) {
            return;
        }
        this.ImageCategory = pathitems[0];
        this.ImageId = pathitems[1];
        this.ImageSize = fileparts[0];
        this.ImageFormat = fileparts[1];
    }
    initialize(url) {
        this.initialUrl = url.toLowerCase();
        ;
        this.ImageCategory = undefined;
        this.ImageId = undefined;
        this.ImageSize = undefined;
        this.ImageFormat = undefined;
        this.HasError = false;
    }
    doPathValidation(items) {
        if (items.length != 3) {
            this.SetError('path invalid (not three elements)');
            return false;
        }
        if (!items[1].match("^([0-9A-Fa-f]{32})$")) {
            this.SetError('ImageId invalid');
            return false;
        }
        return true;
    }
    doFileValidation(items) {
        if (items.length != 2) {
            this.SetError('Filename invalid');
            return;
        }
        if (!this.checkValidSize(items[0])) {
            this.SetError('Size unknown');
            return;
        }
        switch (items[1]) {
            case 'jpg':
            case 'png': break;
            case 'jpeg':
                items[1] = 'jpg';
                break;
            default:
                this.SetError('FileType invalid');
                return false;
        }
        return true;
    }
    checkValidSize(sizeName) {
        return this.validSizes.indexOf(sizeName) >= 0;
    }
    SetError(desc) {
        this.HasError = true;
        this.ErrorDescription = desc;
    }
}
UrlParser.regexId = new RegExp("([0-9A-F]{32})", "ig");
exports.UrlParser = UrlParser;
UrlParser.regexId.compile();
//# sourceMappingURL=UrlParser.js.map