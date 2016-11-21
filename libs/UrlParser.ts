"use strict";

import Http = require('http');
import Url = require('url');

export class UrlParser {
    static regexId = new RegExp("([0-9A-F]{32})", "ig");

    private initialUrl: string;
    private validSizes: Array<string>;

    public ImageCategory: string;
    public ImageId: string;
    public ImageFormat: string;
    public ImageSize: string;
    public HasError: boolean;
    public ErrorDescription: string;

    constructor(sizes: Array<string>) {
        this.validSizes = sizes;
    }

    public parseUrl(url: string) {
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

    private initialize(url: string) {
        this.initialUrl = url.toLowerCase();;
        this.ImageCategory = undefined;
        this.ImageId = undefined;
        this.ImageSize = undefined;
        this.ImageFormat = undefined;
        this.HasError = false;
    }

    private doPathValidation(items: Array<string>): boolean {
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

    private doFileValidation(items: Array<string>): boolean {
        if (items.length != 2) {
            this.SetError('Filename invalid');
            return;
        }
        if (!this.checkValidSize(items[0])){
            this.SetError('Size unknown');
            return;
        }
        switch (items[1]) {
            case 'jpg':
            case 'png': break;
            case 'jpeg': items[1] = 'jpg';
                         break;
            default: this.SetError('FileType invalid');
                     return false;
        }
        return true;
    }

    private checkValidSize(sizeName: string): boolean {
        return this.validSizes.indexOf(sizeName) >= 0;
    }

    private SetError(desc: string) {
        this.HasError = true;
        this.ErrorDescription = desc;
    }
}

UrlParser.regexId.compile();