import { EventEmitter } from 'events';

class EventHandler extends EventEmitter {
    constructor() {
        super();
    }

    Init() {
        chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
            if (typeof msg.id != "string") return;
            if (!Array.isArray(msg.data)) return;
            sendResponse(this.emit(msg.id, ...msg.data));
        });
    }
}

export default new EventHandler();