<script>
    import { onMount } from "svelte";
    import {Toast_Timeout} from '../constants';
    import {fireEvent,EVENTS} from "../EventManager";

    export let msg;
    onMount(() => {
        setTimeout(() => {
            fireEvent(EVENTS.HIDE_TOAST,{});
            msg = "";
        }, Toast_Timeout);
    });


</script>


<div class="flex width-full justify-center absolute z-index-2 top-10">
    <div class="p-t-10 p-b-10 p-l-10 p-r-10 border-radius-5 flex align-center justify-space-between flex-row z-index-2 text-primary bg-primary">
        <pre class="m-0">{msg}</pre>
    </div>    
</div>
