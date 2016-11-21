"use strict";
const Http = require('http');
const UP = require('./UrlParser');
const IP = require('./ImageProcessor');
//import S3 = require('aws-sdk/clients/s3');
class ImageServer {
    constructor(port, config) {
        this.port = port || 1337;
        this.config = config;
    }
    run() {
        this.server = Http.createServer((req, res) => {
            this.handleRequest(req, res);
        });
        this.server.listen(this.port);
    }
    handleRequest(req, res) {
        let urlParser = new UP.UrlParser(new Array("small", "medium", "large", "xlarge"));
        urlParser.parseUrl(req.url);
        if (urlParser.HasError) {
            this.sendUrlInvalid(res, req.url, urlParser.ErrorDescription);
        }
        else {
            //            console.log('Request ok: "%s"', req.url);
            console.log('dir: %s ', __dirname);
            let processor = new IP.ImageProcessor(this.config);
            let buffer = processor.processRequest(urlParser);
            this.sendImageBuffer(res, buffer, urlParser.ImageFormat);
        }
    }
    sendUrlInvalid(res, url, loginfo) {
        console.log('Request failed "%s": %s', url, loginfo);
        res.statusCode = 404;
        res.end();
    }
    sendUrlInfosDebug(res, url) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write("Prefix: " + url.ImageCategory + "\r\n");
        res.write("ID: " + url.ImageId + "\r\n");
        res.write("Size: " + url.ImageSize + "\r\n");
        res.end("Format: " + url.ImageFormat);
    }
    sendImageBuffer(res, buffer, format) {
        res.writeHead(200, { 'Content-Type': 'image/' + format });
        res.write(buffer);
        res.end();
    }
}
exports.ImageServer = ImageServer;
//# sourceMappingURL=ImageServer.js.map