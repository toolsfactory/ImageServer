"use strict";
const FS = require('fs');
const Path = require('path');
class FileStore {
    existsObject(id) {
        let path = Path.normalize(__dirname + "/../images/store/" + id + ".png");
        console.log("real: " + path);
        return FS.existsSync(path);
    }
    getObject(id) {
        let path = __dirname + "/../images/store/" + id + ".png";
        return FS.readFileSync(path);
    }
    getDefault(format) {
        let path = __dirname + "/../images/default/" + format + ".png";
        return FS.readFileSync(path);
    }
}
exports.FileStore = FileStore;
//# sourceMappingURL=FileStore.js.map