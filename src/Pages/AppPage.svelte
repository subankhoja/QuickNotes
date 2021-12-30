<script>
    import Sidebar from "../Sidebar.svelte";
    import NoteArea from "../NoteArea.svelte";
    import NoteItem from "../NoteItem.svelte";
    import ActionPanel from "../utility/ActionPanel.svelte";
    import { onMount } from "svelte";
    import {noteIdToContent , MESSAGE , checkbox_checked_code , checkbox_unchecked_code, check_list_trigger_characters, bullet_list_trigger_characters, list_disc} from '../constants';
    import {getAllNotes , createNewNote , deleteNoteById , updateNoteContent , updateNoteTitle} from '../utility/api';
    import { AUTH , signoutUser } from "../firebase";
    import Input from "../utility/Input.svelte";
    import {registerListener , EVENTS, fireEvent} from '../EventManager';
    import Popup from "../utility/Popup.svelte";
    import { sanitizeContent , normalizeContent} from "../utility";

    export let helpItems;

    let notes = [];
    let selectedNote = {
        id : "",
        title: "",
        content : "",
        isContentChanged : false
    }
    
    let isSearching = false;
    let searchResultFound = null;
    let searchResult = [];
    let editMode = false;

    let Popups = {
        searchPopup : false,
        helpPopup : false
    }

    onMount( () => {

        //Register all Event Listeners...
        registerListener(EVENTS.SELECT_NOTE,onNoteSelect);
        registerListener(EVENTS.DELETE_NOTE,onNoteDelete);
        registerListener(EVENTS.NOTE_NAME_CHANGE,editNoteName);
        registerListener(EVENTS.NOTE_AREA_STATUS_CHANGE,toggleEditMode);
        registerListener(EVENTS.NOTE_AREA_KEY_DOWN,onNoteAreaKeyDown);
        registerListener(EVENTS.NOTE_AREA_KEY_UP,onNoteAreaKeyUp);
        registerListener(EVENTS.NEW_NOTE,newNote);
        registerListener(EVENTS.SAVE_NOTE,saveNote);
        registerListener(EVENTS.USER_SIGNOUT,signoutUser);
        registerListener(EVENTS.OPEN_POPUP,openPopup);
        registerListener(EVENTS.CLOSE_POPUP,closePopup);
        registerListener(EVENTS.CLOSE_POPUP,closePopup);
        registerListener(EVENTS.DOWNLOAD_NOTE,downloadNote);
        fireEvent(EVENTS.SHOW_SPINNER,{});

        getAllNotes(AUTH.currentUser.uid)
        .then(res => {
            if(res && res.data && res.data.length){
                notes = res.data;
                notes.forEach(userNote => {
                    noteIdToContent[userNote.id] = normalizeContent(userNote.content);
                });
                selectedNote.id = notes[0].id;
                selectedNote.title = notes[0].title;
                selectedNote.content = noteIdToContent[notes[0].id];
                fireEvent(EVENTS.HIDE_SPINNER,{});
            }else{
                fireEvent(EVENTS.HIDE_SPINNER,{});
            }
        })
        .catch(err => {
            //createLog('Getting User Notes','69','ERROR',err,ERROR_GROUP);
            fireEvent(EVENTS.SHOW_TOAST,{
                message : MESSAGE.GENERIC_ERROR_MSG
            });
            
            fireEvent(EVENTS.HIDE_SPINNER,{});
        })
    });

    const onNoteSelect = (_selectedNote) => {
        if(_selectedNote.type === 'SIDEBAR'){
            openNote(_selectedNote);
        }else if(_selectedNote.type === 'SEARCH'){
            selectSearchNote(_selectedNote);
        }
    }

    const openNote = (_selectedNote) => {
        if(selectedNote.id && selectedNote.id !== _selectedNote.note_id){
            if(selectedNote.isContentChanged){
                let confirmOnNoteChange = confirm('Are you sure? Your current changes will not be saved!');
                if(!confirmOnNoteChange){
                    return;
                }
            }
        }
        selectedNote = {
            id : _selectedNote.note_id,
            title: _selectedNote.note_name,
            content : noteIdToContent[_selectedNote.note_id],
            isContentChanged : false
        }
    }

    const onNoteDelete = (noteToDelete) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete note : ${selectedNote.title} `);
        if(!confirmDelete) return;
        fireEvent(EVENTS.SHOW_SPINNER,{});
        const note_id = noteToDelete.id;
        deleteNoteById(note_id,AUTH.currentUser.uid)
        .then(res => {
            if(res && res.success){
                notes = notes.filter(note => note.id !== note_id);
                notes = notes;
                selectedNote = {
                    id : '',
                    title: '',
                    content : '',
                    isContentChanged : false
                }
                delete noteIdToContent[note_id];
                fireEvent(EVENTS.SHOW_TOAST,{
                    message : MESSAGE.NOTE_DELETE_SUCEESS
                });
            }else{
                fireEvent(EVENTS.SHOW_TOAST,{
                    message : MESSAGE.GENERIC_ERROR_MSG
                });
            }
            fireEvent(EVENTS.HIDE_SPINNER,{});
        })
        .catch(err => {
            //createLog('deleteNote','147','ERROR',err,ERROR_GROUP);
            fireEvent(EVENTS.SHOW_TOAST,{
                message : MESSAGE.GENERIC_ERROR_MSG
            });
            fireEvent(EVENTS.HIDE_SPINNER,{});
        })
    }

    const newNote = () => {
        const newNoteName = prompt("Please enter note name");
        if(newNoteName){
            fireEvent(EVENTS.SHOW_SPINNER,{});
            createNewNote(newNoteName,AUTH.currentUser.uid)
            .then(res => {
                if(res && res.success && res.data && res.data.new_note_id){
                    const new_note_id = res.data.new_note_id;
                    notes.push({
                        id : new_note_id,
                        title : newNoteName
                    })
                    noteIdToContent[new_note_id] = '';
                    selectedNote = {
                        id : new_note_id,
                        title: newNoteName,
                        content : noteIdToContent[new_note_id],
                        isContentChanged : false
                    }
                    notes = notes;
                }else{
                    fireEvent(EVENTS.SHOW_TOAST,{
                        message : MESSAGE.GENERIC_ERROR_MSG
                    });
                }
                fireEvent(EVENTS.HIDE_SPINNER,{});
            })
            .catch(err => {
                fireEvent(EVENTS.SHOW_TOAST,{
                    message : MESSAGE.GENERIC_ERROR_MSG
                });
                fireEvent(EVENTS.HIDE_SPINNER,{});
            })
        }
    };

    const openPopup = (popup_detail) => {
        Popups[popup_detail.popupName] = true;
    }

    const saveNote = () => {
        fireEvent(EVENTS.SHOW_SPINNER,{});
        const note_content_sanitize = sanitizeContent(selectedNote.content);
        updateNoteContent(selectedNote.id,note_content_sanitize,AUTH.currentUser.uid)
        .then(res => {
            if(res && res.success){
                noteIdToContent[selectedNote.id] = selectedNote.content;
                fireEvent(EVENTS.SHOW_TOAST,{
                    message : MESSAGE.NOTE_SAVE_SUCCESS
                });
                selectedNote.isContentChanged = false;
            }else{
                fireEvent(EVENTS.SHOW_TOAST,{
                    message : MESSAGE.GENERIC_ERROR_MSG
                });
            }
            fireEvent(EVENTS.HIDE_SPINNER,{});
        })
        .catch(err => {
            //createLog('saveNote','193','ERROR',err,ERROR_GROUP);
            fireEvent(EVENTS.SHOW_TOAST,{
                message : MESSAGE.GENERIC_ERROR_MSG
            });
            fireEvent(EVENTS.HIDE_SPINNER,{});
        });
    };

    const closePopup = () => {
        for(let popup_item in Popups){
            if(Popups[popup_item] && popup_item === 'searchPopup'){
                isSearching = false;
                searchResultFound = null;
                searchResult = [];
            }
            Popups[popup_item] = false;
        }
    }

    const doSearch = (evt) => {
        const searchKey = evt.target.value;
        if(!searchKey){
            searchResultFound = null;
            searchResult = [];
            return;
        } 
        isSearching = true;
        const searchKey_lowercase = searchKey.toLowerCase();
        searchResult = notes.filter(
            note => {
                const none_name_lowercase = note.title ? note.title.toLowerCase() : '';
                const none_content_lowercase = note.content ? note.content.toLowerCase() : '';
                return(
                    (none_name_lowercase && none_name_lowercase.indexOf(searchKey_lowercase) > -1)
                    ||
                    (none_content_lowercase && none_content_lowercase.indexOf(searchKey_lowercase) > -1)
                );
            }
        );
        searchResult = searchResult;
        searchResultFound =  !!Number(searchResult && searchResult.length);
    }

    const selectSearchNote = (_selectedNote) => {
        if(selectedNote.id && selectedNote.id !== _selectedNote.note_id){
            if(selectedNote.isContentChanged){
                let confirmOnNoteChange = confirm('Are you sure? Your current changes will not be saved!');
                if(!confirmOnNoteChange){
                    return;
                }
            }
        }
        selectedNote = {
            id : _selectedNote.note_id,
            title : _selectedNote.note_name,
            content  :noteIdToContent[_selectedNote.note_id],
            isContentChanged : false
        }
        closePopup();
    }

    const editNoteName = () => {
        const newNoteName = prompt("Please enter note name",selectedNote.title);
        if(!newNoteName) return;
        fireEvent(EVENTS.SHOW_SPINNER,{});
        updateNoteTitle(selectedNote.id,newNoteName,firebase.auth().currentUser.uid)
        .then(res => {
            if(res && res.success){
                selectedNote.title = newNoteName;
                for(let index = 0 ; index < notes.length ; index++){
                    if(notes[index].id === selectedNote.id){
                        notes[index].title = newNoteName;
                        break;
                    }
                }
                fireEvent(EVENTS.SHOW_TOAST,{
                    message : MESSAGE.NOTE_SAVE_SUCCESS
                });
            }else{
                fireEvent(EVENTS.SHOW_TOAST,{
                    message : MESSAGE.GENERIC_ERROR_MSG
                });
                
            }
            fireEvent(EVENTS.HIDE_SPINNER,{});
        })
        .catch(err => {
            //createLog('editNoteName','276','ERROR',err,ERROR_GROUP);
            fireEvent(EVENTS.SHOW_TOAST,{
                message : MESSAGE.GENERIC_ERROR_MSG
            });
            
            fireEvent(EVENTS.HIDE_SPINNER,{});
        });
    };

    window.addEventListener('keyup',(e) => {

        if(e.altKey){
            if((e.key == 's' || e.key == "S") && editMode){
                saveNote();
            }else if(e.key == 'n' || e.key == "N"){
                newNote();
            }else if(e.key == 'f' || e.key == "F"){
                openSearchPopup();
            }else{
                return;
            }
        }else{
            return;
        }
        
    },false);

    window.addEventListener('keydown',(e) => {
        if(
            e.altKey && (
            e.key == 's' || e.key == 'S' || 
            e.key == 'f' || e.key == 'F' || 
            e.key == 'n' || e.key == 'N')
        ){
            e.preventDefault();
        }
            
    },false);

    const toggleEditMode = (payload) => {
        editMode = payload.status === 'focus';
    };

    const onNoteAreaKeyDown = (evt) => {
        const _this = evt.target;
        if (evt.key == 'Tab') {
            evt.preventDefault();
            const start = _this.selectionStart;
            const end = _this.selectionEnd;
            // set textarea value to: text before caret + tab + text after caret
            _this.value = _this.value.substring(0, start) + "\t" + _this.value.substring(end);
    
            // put caret at right position again
            _this.selectionStart = _this.selectionEnd = start + 1;
        }else if(evt.key === 'Enter'){
            const cursorPlace = _this.selectionStart;
            const allLines = _this.value.split("\n");
            const currentLineIndex = _this.value.substr(0, cursorPlace).split("\n").length - 1;
            if(allLines && allLines.length && currentLineIndex > -1){
                let currentLine = allLines[currentLineIndex];
                if(currentLine){
                    if(evt.ctrlKey){
                        if(currentLine.indexOf(checkbox_unchecked_code) > -1 && !(currentLine === checkbox_unchecked_code)){
                            currentLine =  currentLine.replace(checkbox_unchecked_code, checkbox_checked_code);
                        }else if(currentLine.indexOf(checkbox_checked_code) > -1 && !(currentLine === checkbox_checked_code)){
                            currentLine =  currentLine.replace(checkbox_checked_code, checkbox_unchecked_code);
                        }
                        allLines[currentLineIndex] = currentLine;
                        _this.value = allLines.join('\n');
                        _this.setSelectionRange(cursorPlace,cursorPlace);
                    }else{
                        if(currentLine.indexOf(checkbox_unchecked_code) > -1 || currentLine.indexOf(checkbox_checked_code) > -1){
                            evt.preventDefault();
                            if(!(currentLine === checkbox_unchecked_code)){
                                selectedNote.content = selectedNote.content.slice(0,cursorPlace) + '\n' + checkbox_unchecked_code+selectedNote.content.slice(cursorPlace);
                            }else{
                                currentLine = '';
                            }
                            allLines[currentLineIndex] = currentLine;
                            _this.value = allLines.join('\n');
                            if(!(currentLine === checkbox_unchecked_code)){
                                _this.setSelectionRange(cursorPlace,cursorPlace);
                            }else{
                                _this.setSelectionRange(cursorPlace-1,cursorPlace-1);
                            }
                        }else if(currentLine.indexOf(list_disc) > -1){
                            evt.preventDefault();
                            if(!(currentLine === list_disc)){
                                selectedNote.content = selectedNote.content.slice(0,cursorPlace) + '\n' + list_disc +selectedNote.content.slice(cursorPlace);
                            }else{
                                currentLine = '';
                            }
                            allLines[currentLineIndex] = currentLine;
                            _this.value = allLines.join('\n');
                            if(!(currentLine === list_disc)){
                                _this.setSelectionRange(cursorPlace,cursorPlace);
                            }else{
                                _this.setSelectionRange(cursorPlace-1,cursorPlace-1);
                            }
                        }
                    }
                }
            }
        }
    }

    const onNoteAreaKeyUp = (payload) => {
        selectedNote.content = payload.noteArea.value;
        if(selectedNote.content != noteIdToContent[selectedNote.id]){
            selectedNote.isContentChanged = true;
        }else{
            selectedNote.isContentChanged = false;
        }
        const _this = payload.noteArea;
        const cursorPlace = _this.selectionStart;
        
        if(selectedNote.content &&  selectedNote.content.length > 1 && selectedNote.content.substring(cursorPlace-2,cursorPlace) === check_list_trigger_characters  || selectedNote.content.substring(cursorPlace-2,cursorPlace) === bullet_list_trigger_characters ){
            const allLines = _this.value.split("\n");
            const currentLineIndex = _this.value.substr(0, _this.selectionStart).split("\n").length - 1;
            const hasStartedCheckList = selectedNote.content.substring(cursorPlace-2,cursorPlace) === check_list_trigger_characters;
            if(allLines && allLines.length && currentLineIndex > -1){
            let currentLine = allLines[currentLineIndex];
            if(currentLine === check_list_trigger_characters || currentLine === bullet_list_trigger_characters){
                selectedNote.content = selectedNote.content.slice(0,cursorPlace-2) + ((hasStartedCheckList) ? checkbox_unchecked_code : list_disc) + selectedNote.content.slice(cursorPlace);
                _this.setSelectionRange(cursorPlace-1,cursorPlace-1);
            }else{
                selectedNote.content = selectedNote.content.slice(0,cursorPlace-2) +'\n' + ((hasStartedCheckList) ? checkbox_unchecked_code : list_disc) + selectedNote.content.slice(cursorPlace);
                _this.setSelectionRange(cursorPlace,cursorPlace);
            }
            
            }
        }
    }

    const downloadNote = () => {
		
		const blob_file = new Blob([selectedNote.content],{
			type : 'text/plain'
		});

        let link_ele = document.createElement('a');
        link_ele.href = URL.createObjectURL(blob_file);
        link_ele.download = `${selectedNote.title}.txt`;

        document.body.appendChild(link_ele);
        link_ele.click();
        URL.revokeObjectURL(blob_file);
        document.body.removeChild(link_ele);

	}

</script>

<Sidebar {notes} {selectedNote}/>
<NoteArea noteName={selectedNote.title} show={selectedNote.id} content={selectedNote.content} isContentChanged={selectedNote.isContentChanged} />
<ActionPanel {selectedNote} />
{#if Popups.searchPopup}
    <Popup header="Search Notes">
        <Input classes="width-100 border-box" name="search" type="text" onKeyUp={doSearch} placeholder="Type here to search"/>
        {#if searchResultFound === false && isSearching}
            <div class="text-primary text-center width-100 text-bold">No Result Found!</div>
        {/if}
        <ul class="p-0 m-b-32 max-height overflow-auto">
            {#each searchResult as note}
                <NoteItem note_name={note.title} note_id={note.id} type="SEARCH"/>    
            {/each}
        </ul>
    </Popup>
{/if}
{#if Popups.helpPopup}
    <Popup header="Help">
        <ul class="p-0 m-b-32 max-height overflow-auto">
            {#each helpItems as item}
                <li class="flex flex-column m-t-5 m-b-5">
                    <span class="p-t-5 p-b-5 p-l-20 p-r-20 border-solid-1 border-radius-25 bg-secondary badge-shadow">Press <span class="text-bold">{item.key}</span>{item.task}</span>
                </li>    
            {/each}
        </ul>
    </Popup>
{/if}