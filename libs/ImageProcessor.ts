"use strict";

import UP = require('./UrlParser');
import Config = require('./Config');
import SI = require('./StoreInterface');
import FileStore = require('./FileStore');

export class ImageProcessor {
    private urlParser: UP.UrlParser;
    private sourceImage: Buffer;
    private sourceImageSizeX: number;
    private sourceImageSizeY: number;
    private image: Buffer;
    private config: Config.Config;

    constructor(config: Config.Config) {
        this.sourceImage = undefined;
        this.config = config;
    };

    public processRequest(urlparser: UP.UrlParser): Buffer {
        this.urlParser = urlparser;
        this.loadImageIfExists();
        if (this.isImageUndefined()) {
            this.loadDefaultImageBySize();
        }
        this.scaleAndFormatImage();
        return this.image;
    }

    private loadImageIfExists() {
        let fs = new FileStore.FileStore();
        if(fs.existsObject(this.urlParser.ImageId)) {
            this.sourceImage = fs.getObject(this.urlParser.ImageId);
        } else {
            this.sourceImage = undefined;
        }
    };

    private isImageUndefined(): boolean {
        return this.sourceImage == undefined;
    }

    private loadDefaultImageBySize() {

    }

    private scaleAndFormatImage() {
        this.image = this.sourceImage;
    }
}