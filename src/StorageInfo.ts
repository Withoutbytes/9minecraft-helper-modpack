import { IStorage } from "./types"

export namespace StorageInfo {
    export const Save = (iStorage: IStorage) => new Promise<void>(res => {
        chrome.storage.sync.set({ "iStorageInfo": iStorage }, () => {
            res();
        })
    })

    export const Load = () => new Promise<IStorage>(res => {
        chrome.storage.sync.get("iStorageInfo", (items) => {
            if (items) res(items.iStorageInfo);
            else res({ mods: [] });
        });
    })
}