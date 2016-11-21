"use strict";

import FS = require('fs');
import SI = require('./StoreInterface');
import Path = require('path');

export class FileStore implements SI.StoreInterface {
    public existsObject(id: string): boolean{
        let path = Path.normalize(__dirname + "/../images/store/" + id + ".png");
        return FS.existsSync(path);
    }

    public getObject(id: string) : Buffer {
        let path = Path.normalize(__dirname + "/../images/store/" + id + ".png");
        return FS.readFileSync(path);
    }

    public getDefault(format: string) : Buffer {
        let path = Path.normalize(__dirname + "/../images/default/" + format + ".png");
        return FS.readFileSync(path);
    }
}