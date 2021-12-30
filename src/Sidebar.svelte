<script>
    import Image from "./utility/Image.svelte";
    import NoteItem from "./NoteItem.svelte";
    import { AUTH } from "./firebase";
    import { APP_NAME } from "./constants";
    export let notes = [];
    export let selectedNote;
    
</script>

<div class="sidebar height-full absolute bg-secondary border-box">
    <header class='header text-primary text-bold border-box flex align-center p-t-10 p-b-5 p-l-8'>
        <Image classes="m-l-4 m-r-4" src="logo.svg" alt="logo" type="logo"/>
        <span class="text-medium text-boldest text-primary">{APP_NAME}</span>
    </header>
    <ul class="p-l-10 p-r-10 min-h-85 height-85">
        {#each notes as note}
            <NoteItem note_name={note.title} note_id={note.id} active={note.id === selectedNote.id} type="SIDEBAR" showDelete/>    
        {/each}
    </ul>

    <footer class="flex justify-center align-center flex-column width-100 absolute bottom-5">
        <span class="bg-primary text-bold text-underline">{AUTH.currentUser.email}</span>
    </footer>
</div>

<style>
    .sidebar{
        width: 350px;
    }

    
</style>