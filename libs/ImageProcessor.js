"use strict";
const FileStore = require('./FileStore');
class ImageProcessor {
    constructor(config) {
        this.sourceImage = undefined;
        this.config = config;
    }
    ;
    processRequest(urlparser) {
        this.urlParser = urlparser;
        this.loadImageIfExists();
        if (this.isImageUndefined()) {
            this.loadDefaultImageBySize();
        }
        this.scaleAndFormatImage();
        return this.image;
    }
    loadImageIfExists() {
        let fs = new FileStore.FileStore();
        if (fs.existsObject(this.urlParser.ImageId)) {
            this.sourceImage = fs.getObject(this.urlParser.ImageId);
        }
        else {
            this.sourceImage = undefined;
        }
    }
    ;
    isImageUndefined() {
        return this.sourceImage == undefined;
    }
    loadDefaultImageBySize() {
    }
    scaleAndFormatImage() {
        this.image = this.sourceImage;
    }
}
exports.ImageProcessor = ImageProcessor;
//# sourceMappingURL=ImageProcessor.js.map