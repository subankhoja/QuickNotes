<script>
    import { fireEvent,EVENTS } from "../EventManager";

    import Action from "./Action.svelte";
    import Line from "./Line.svelte";
    
    export let selectedNote = {};


    const onNewNote = () => {
        fireEvent(EVENTS.NEW_NOTE,{});
    }
    
    const onHelpNeed = () => {
        fireEvent(EVENTS.OPEN_POPUP,{
            popupName : 'helpPopup'
        });
    }

    const onSignout = () => {
        fireEvent(EVENTS.USER_SIGNOUT,{});
    }

    const onSearch = () => {
        fireEvent(EVENTS.OPEN_POPUP,{
            popupName : 'searchPopup'
        });
    }

    const onDownload = () => {
        fireEvent(EVENTS.DOWNLOAD_NOTE,{});
    }

</script>

<div class="flex justify-space-between align-center max-width fixed top-10 right-10 bg-white border-radius-25 p-t-5 p-b-5 p-l-20 p-r-20 badge-shadow">
    <Action title="New Note" OnClick={onNewNote}> 
        <path fill="currentColor" fill-rule="evenodd" d="M13 4v6a1 1 0 0 0 1 1h6a1 1 0 0 1 0 2h-6a1 1 0 0 0-1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 0-1-1H4a1 1 0 0 1 0-2h6a1 1 0 0 0 1-1V4a1 1 0 0 1 2 0z"></path>
    </Action>
    <Line />
    <Action title="Search" OnClick={onSearch}>
        <path fill="currentColor" fill-rule="evenodd" d="M10 2a8 8 0 0 1 6.568 12.568l4.871 4.871a1.5 1.5 0 1 1-2.121 2.122l-4.894-4.895A8 8 0 1 1 10 2zm0 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
    </Action>
    <Line />
    <Action title="Signout" OnClick={onSignout}>
        <path fill="currentColor" fill-rule="evenodd" d="M20.84 3.657a7 7 0 0 1-7.107 11.61l-3.38 3.38a1.38 1.38 0 0 1-.848.353h-2.01c-.28 0-.65.155-.843.347l-1.804 1.805c-.184.184-.573.348-.85.348l-2-.001 7.882-7.882a.5.5 0 0 0 .058-.637l-.058-.07a.5.5 0 0 0-.707 0l-8.166 8.165L1 20.994v-1.488c0-.275.16-.658.356-.844l7.983-7.585a7.001 7.001 0 0 1 11.501-7.42zm-1.414 1.415a5 5 0 1 0-7.07 7.07 5 5 0 0 0 7.07-7.07zm-.707.707a1.5 1.5 0 1 1-2.121 2.12 1.5 1.5 0 0 1 2.121-2.12z"></path>
    </Action>
    <Line />
    <Action title="Help & Shortcuts" OnClick={onHelpNeed}>
        <path fill="currentColor" fill-rule="evenodd" d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-.14 13.56c.75 0 1.345.575 1.345 1.308 0 .733-.594 1.318-1.346 1.318-.751 0-1.354-.585-1.354-1.318 0-.733.603-1.308 1.354-1.308zm.333-11.059c2.515 0 4.24 1.43 4.24 3.526 0 1.42-.705 2.393-1.967 3.145-1.215.705-1.512 1.15-1.586 1.995-.093.612-.408.992-1.04.992-.704 0-1.094-.5-1.094-1.178v-.176c0-1.15.575-1.911 1.735-2.598 1.15-.696 1.54-1.206 1.54-2.097 0-1.01-.789-1.716-1.93-1.716-1.03 0-1.716.51-2.013 1.447-.204.576-.547.807-1.057.807-.64 0-1.021-.39-1.021-1.01 0-.4.083-.743.26-1.096.575-1.261 2.022-2.04 3.933-2.04z"></path>
    </Action>

    {#if selectedNote.id}
        <Line />
        <Action title="Download" OnClick={onDownload}>
            <path fill="currentColor" fill-rule="evenodd" d="M21 8a1 1 0 0 1 1 1v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a1 1 0 1 1 2 0v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1zm-5.5 2a1.5 1.5 0 0 1 0 3h-7a1.5 1.5 0 0 1 0-3h7zM23 4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h22z"></path>
        </Action>
    {/if}
    
</div>