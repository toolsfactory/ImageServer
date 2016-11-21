"use strict";

import Http = require('http');
import Url = require('url');
import Config = require('./Config');
import UP = require('./UrlParser');
import IP = require('./ImageProcessor');
//import S3 = require('aws-sdk/clients/s3');

export class ImageServer {

    private port: number;
    private server: Http.Server;
    private config: Config.Config;

    constructor(port: number, config: Config.Config) {
        this.port = port || 1337;
        this.config = config;
    }

    public run() {
        this.server = Http.createServer((req: Http.IncomingMessage, res: Http.ServerResponse) => {
            this.handleRequest(req, res);
        });
        this.server.listen(this.port);
    }

    private handleRequest(req: Http.IncomingMessage, res: Http.ServerResponse) {
        let urlParser = new UP.UrlParser(new Array<string>("small", "medium", "large", "xlarge"));
        urlParser.parseUrl(req.url);

        if (urlParser.HasError) {
            this.sendUrlInvalid(res, req.url, urlParser.ErrorDescription);
        } else {
//            console.log('Request ok: "%s"', req.url);
            console.log('dir: %s ', __dirname);
            let processor = new IP.ImageProcessor(this.config);
            let buffer = processor.processRequest(urlParser);
            this.sendImageBuffer(res, buffer, urlParser.ImageFormat);

            //this.sendUrlInfosDebug(res, urlParser);
        }
    }

    private sendUrlInvalid(res: Http.ServerResponse, url: string, loginfo: string) {
        console.log('Request failed "%s": %s', url, loginfo);
        res.statusCode = 404;
        res.end();
    }

    private sendUrlInfosDebug(res: Http.ServerResponse, url: UP.UrlParser) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write("Prefix: " + url.ImageCategory + "\r\n");
        res.write("ID: " + url.ImageId + "\r\n");
        res.write("Size: " + url.ImageSize + "\r\n");
        res.end("Format: " + url.ImageFormat);
    }

    private sendImageBuffer(res: Http.ServerResponse, buffer: Buffer, format: string) {
        res.writeHead(200, { 'Content-Type': 'image/' + format });
        res.write(buffer);
        res.end();
    }
}