import { API } from "../constants";

export const getAllNotes = (userId) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.getAllNotes,{
        method : 'POST',
        headers : {
            'X-User-Id' : userId
        },
        body : window.btoa(JSON.stringify({}))
    })
    .then(res => res.json())
    .catch(err => {
        (window.quick_notes.config.debug_mode) && console.error('getAllNotes : ',err);
    });
};

export const createNewNote = (name,userId) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.createNote,{
        method : 'POST',
        headers : {
            'X-User-Id' : userId
        },
        body : window.btoa(JSON.stringify({
            name
        }))
    }).then(res => res.json())
    .catch(err => {
        (window.quick_notes.config.debug_mode) && console.error('createNewNote : ',err);
    });
};

export const deleteNoteById = (id,userId) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.deleteNote,{
        method : 'POST',
        headers : {
            'X-User-Id' : userId
        },
        body : window.btoa(JSON.stringify({
            id
        }))
    }).then(res => res.json())
    .catch(err => {
        (window.quick_notes.config.debug_mode) && console.error('deleteNoteById : ',err);
    });
};

export const updateNoteContent = (id,content,userId) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.updateNoteContent,{
        method : 'POST',
        headers : {
            'X-User-Id' : userId
        },
        body : window.btoa(JSON.stringify({
            id,
            content
        }))
    }).then(res => res.json())
    .catch(err => {
        (window.quick_notes.config.debug_mode) && console.error('updateNoteContent : ',err);
    });
};

export const updateNoteTitle = (id,name,userId) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.updateNoteTitle,{
        method : 'POST',
        headers : {
            'X-User-Id' : userId
        },
        body : window.btoa(JSON.stringify({
            id,
            name
        }))
    }).then(res => res.json())
    .catch(err => {
        (window.quick_notes.config.debug_mode) && console.error('updateNoteTitle : ',err);
    });
};

export const requestAccess = (email) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.requestAccess,{
        method : 'POST',
        body : window.btoa(JSON.stringify({
            email
        }))
    }).then(res => res.json())
    .catch(err => {
        (window.quick_notes.config.debug_mode) && console.error('createNewNote : ',err);
    });
};