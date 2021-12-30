<script>
import { onMount } from "svelte";
import Image from "../utility/Image.svelte";
import {APP_NAME} from '../constants';

export let show;
export let helpItems;
    
    let selectedMsg = {
        "key" : "",
        "task" : "" 
    }
    
    onMount( ()=>{
        selectedMsg = helpItems[Math.floor(Math.random()*3)];
    });

</script>

{#if show}
    <div class="flex justify-center align-center fixed height-full width-full z-index-1 flex-column bg-white">
        <div class="flex align-center">
            <Image classes="m-l-4 m-r-4" src="logo.svg" alt="logo" type="logo"/>
            <span class="text-medium text-primary text-boldest"> {APP_NAME} </span>
        </div>
        <br/>
        <div class="flex flex-column">
            <span class="p-t-5 p-b-5 p-l-20 p-r-20 border-radius-25 badge-shadow">Press <span class="bg-primary text-bold p-t-5 p-l-5 p-b-5 p-r-5 border-radius-5">{selectedMsg.key}</span>{selectedMsg.task}</span>
        </div>
    </div>
{/if}


<style>

</style>