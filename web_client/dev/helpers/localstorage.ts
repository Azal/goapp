import {provide} from 'angular2/core';

export class LocalStorage {
    public localStorage: any;

    constructor() {
        if (!localStorage) {
            throw new Error('Current browser does not support Local Storage');
        }
        this.localStorage = localStorage;
    }

    public set(key:string, value:string):void {
        this.localStorage[key] = value;
    }

    public get(key:string):string {
        return this.localStorage[key] || false;
    }

    public setItem(key:string, value:any):void {
        this.localStorage[key] = JSON.stringify(value);
    }

    public getItem(key:string):any {
        return JSON.parse(this.localStorage[key] || '{}');
    }

    public removeItem(key:string):any {
        this.localStorage.removeItem(key);
    }
}

export const LOCAL_STORAGE_PROVIDERS:any[] = [
    provide(LocalStorage, {useClass: LocalStorage})
];
