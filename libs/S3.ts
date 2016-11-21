"use strict";

const aws       = require("aws-sdk");
const client  = new aws.S3({apiVersion: "2006-03-01"});

export class S3 {
    /**
     * Get object data from S3 bucket
     *
     * @param String bucket
     * @param String key
     * @return Promise
     */
    static getObject(bucket, key, acl) {
        return new Promise((resolve, reject) => {
            client.getObject({ Bucket: bucket, Key: key }, (err, data) => {
                if ( err ) {
                    reject("S3 getObject failed: " + err);
                    return;
                }

                if ( "img-processed" in data.Metadata ) {
                    reject("Object was already processed.");
                    return;
                }

                resolve(undefined);
            });
        });
    }

}
