export const Toast_Timeout = 2000;
export const check_list_trigger_characters = '##';
export const bullet_list_trigger_characters = '$$';
export const noteIdToContent = {};
export const checkbox_unchecked_code = '⬜';
export const checkbox_checked_code = '✅';
export const list_disc = '◼️';
export const checkbox_unchecked_code_sanitized = '[##]';
export const checkbox_checked_code_sanitized = '[**]';
export const list_disc_sanitized = '[..]';

export const APP_NAME = 'Quick Notes';
export const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const API = {
    BASE_ENDPOINT : 'https://collab-notes-one-developer-edition.ap27.force.com/services/apexrest/api/',
    ENDPOINTS : {
        'getAllNotes': 'getAllNotes',
        'createNote': 'createNewNote',
        'deleteNote' : 'deleteNote',
        'updateNoteTitle' : 'updateNoteTitle',
        'updateNoteContent' : 'updateNoteContent',
        'requestAccess' : 'requestAccess'
    }
};

const MESSAGE = {
    LOGIN_SUCESS : 'login sucessfully!',
    GENERIC_ERROR_MSG : 'something went wrong!',
    NOTE_SAVE_SUCCESS : 'Note saved successfully',
    TEXT_COPY_SUCCESS : 'text copied!',
    NOTE_DELETE_SUCEESS : 'Note deleted successfully.',
    ENTER_EMAIL : 'Please enter your email',
    ENTER_PASSWORD : 'Please enter your Password',
    INVALID_CREDS : 'Invalid Email or Password.',
    REQUEST_SUCCESS : 'Your request is successfully submitted.'
};

const helpItems = [
    {
        "key" : "Alt + s",
        "task" : " to save your note."        
    },
    {
        "key" : "Alt + n",
        "task" : " to create new note."        
    },
    {
        "key" : "Alt + f",
        "task" : " to search your notes."        
    }
];

Object.freeze(API);
Object.freeze(MESSAGE);
Object.freeze(helpItems);

export {
    API,
    MESSAGE,
    helpItems
};