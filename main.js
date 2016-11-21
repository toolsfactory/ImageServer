"use strict";
const Server = require('./libs/ImageServer');
const Config = require('./libs/Config');
const Fs = require("fs");
const Path = require("path");
const port = process.env.port || 1337;
const configPath = Path.resolve(__dirname, "config.json");
const configData = JSON.parse(Fs.readFileSync(configPath, "utf8"));
const config = new Config.Config(configData);
const iserv = new Server.ImageServer(port, config);
iserv.run();
//# sourceMappingURL=main.js.map