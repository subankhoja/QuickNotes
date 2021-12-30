<script>
    import {fireEvent,EVENTS} from "./EventManager";

    export let show;
    export let noteName="";
    export let content;
    export let isContentChanged = false;

    const fireNoteChangeNameEvent = () => {
        fireEvent(EVENTS.NOTE_NAME_CHANGE,{});
    }

    const sendNoteAreaStatus = (evt) => {
        fireEvent(EVENTS.NOTE_AREA_STATUS_CHANGE,{status : evt.type});
    }

    const fireNoteAreaKeyUpEvent = (evt) => {
        fireEvent(EVENTS.NOTE_AREA_KEY_UP,{noteArea : evt.target});
    }

    const fireNoteAreaKeyDownEvent = (evt) => {
        fireEvent(EVENTS.NOTE_AREA_KEY_DOWN,evt);
    }

</script>


{#if show}
    <div class="note-container absolute bg-white height-full border-box z-index--1 m-l-400">
        <header class="text-primary text-bold flex p-t-8 p-b-8 p-l-8 p-r-8 border-box flex-space-between align-center">
            <span class="note-name w-90 max-w-90 pointer text-large {isContentChanged ? 'unsaved' : ''}" on:click={fireNoteChangeNameEvent}>{noteName}</span>
        </header>
        <textarea class="m-t-1-em border-box no-border text-x-medium m-l-50 no-resize no-outline height-85" on:keydown={fireNoteAreaKeyDownEvent} on:keyup={fireNoteAreaKeyUpEvent} bind:value={content} on:focus={sendNoteAreaStatus} on:blur={sendNoteAreaStatus}></textarea>
    </div>
{/if}

<style>
    .note-container {
        width: calc(100% - 400px);
    }

    textarea {
        width: calc(100% - 50px);
    }

    span.note-name.unsaved::after {
        content: "*";
        font-weight: bolder;
        color: indianred;
    }
</style>
