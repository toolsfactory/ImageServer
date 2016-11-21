"use strict";

export interface StoreInterface {
    existsObject(id: string) : boolean;
    getObject(id: string) : Buffer;
    getDefault(format: string) : Buffer;
}