<script>
    import Icon from "./utility/Icon.svelte";
    import Action from "./utility/Action.svelte";
    import {fireEvent,EVENTS} from "./EventManager";
    export let note_name;
    export let note_id;
    export let active = false;
    export let showDelete = false;
    export let type;
    
    const onSelect = () => {
        fireEvent(EVENTS.SELECT_NOTE,{
            type,
            note_id : note_id,
            note_name : note_name
        });
    }

    const onDelete = () => {
        fireEvent(EVENTS.DELETE_NOTE,{id : note_id});
    }

</script>


<li id={note_id} class="note-item p-t-8 p-b-8 p-r-10 p-l-10 no-border text-primary pointer flex align-center height-24 justify-space-between border-radius-5 {active ? 'active' : ''}" >
    <span class="width-90 max-w-90 pointer text-x-medium" on:click={onSelect}>{note_name}</span>
    {#if showDelete}
        <!-- <Icon name="delete" OnClick={onDelete}/> -->
        <Action title="Help & Shortcuts" OnClick={onDelete}>
            <path fill="currentColor" fill-rule="evenodd" d="M18 7a1 1 0 0 1 1 1v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a1 1 0 1 1 2 0v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 1 1-1zm-8 2a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm1-7a1 1 0 0 1 1 1v1h4a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2h4V3a1 1 0 0 1 1-1h6z"></path>
        </Action>
    {/if}
</li>
