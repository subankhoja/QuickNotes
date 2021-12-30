const events = {};

const EVENTS = {
    SELECT_NOTE : 'SELECT_NOTE',
    DELETE_NOTE : 'DELETE_NOTE',
    NOTE_NAME_CHANGE : 'NOTE_NAME_CHANGE',
    OPEN_POPUP : 'OPEN_POPUP',
    NOTE_AREA_STATUS_CHANGE : 'NOTE_AREA_STATUS',
    NOTE_AREA_KEY_UP : 'NOTE_AREA_KEY_UP',
    NOTE_AREA_KEY_DOWN : 'NOTE_AREA_KEY_DOWN',
    NEW_NOTE : 'NEW_NOTE',
    SAVE_NOTE : 'SAVE_NOTE',
    USER_SIGNOUT : 'USER_SIGNOUT',
    USER_LOGIN : 'USER_LOGIN',
    CLOSE_POPUP : 'CLOSE_POPUP',
    SEARCH_NOTE : 'SEARCH_NOTE',
    SHOW_SPINNER : 'SHOW_SPINNER',
    HIDE_SPINNER : 'HIDE_SPINNER',
    SHOW_TOAST : 'SHOW_TOAST',
    HIDE_TOAST : 'HIDE_TOAST',
    USER_ACCESS_APP : 'USER_ACCESS_APP',
    DOWNLOAD_NOTE : 'DOWNLOAD_NOTE'
}

Object.freeze(EVENTS);

const registerListener = (eventName, callback) => {  
    if (!events[eventName]) {
        events[eventName] = [];
    }
    const duplicate = events[eventName].find((listener) => {
        return listener.callback === callback;
    });
    if (!duplicate) {
        events[eventName].push({ callback});
    }
};
 
const fireEvent = (eventName, payload) => {
    if (events[eventName]) {
        const listeners = events[eventName];
        listeners.forEach((listener) => {       
        try {
            listener.callback.call(this,payload);
        } catch (error) {
            (window.quick_notes.config.debug_mode) && (
                console.error('@eventName : ',eventName) &&
                console.error('@listener : ',listener) &&
                console.error('@payload : ',payload) &&
                console.error('@error : ',error)
            );
        }
        });
    }
};

export {
    registerListener,
    fireEvent,
    EVENTS
};
 