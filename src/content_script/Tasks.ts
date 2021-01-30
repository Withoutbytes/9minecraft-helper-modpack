import { IModItem } from "../types";

export namespace Tasks {
    export const AddMod = async (modInfo: IModItem) => new Promise(res => {
        chrome.runtime.sendMessage({ id: "AddMod", data: [{ modInfo }] }, res);
    })

    export const RemoveMod = async (modInfo: IModItem) => new Promise(res => {
        chrome.runtime.sendMessage({ id: "RemoveMod", data: [{ modInfo }] }, res);
    })
}