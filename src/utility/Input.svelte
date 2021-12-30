<script>

    export let hasLabel = false;
    export let type;
    export let name;
    export let label;
    export let placeholder;
    export let onChange;
    export let onKeyUp;
    export let classes = "";

</script>

{#if hasLabel}
    <label class="text-bold block" for={name}>{label}</label>    
{/if}

{#if type === 'email'}
    <input class="border-radius-5 border-color-secondary m-t-5 m-b-5 p-l-16 p-r-16 p-t-10 p-b-10 bg-white border-solid-1 {classes}" type="email" name={name} on:change={onChange} />
    {:else if type === 'password'}
    <input class="border-radius-5 border-color-secondary m-t-5 m-b-5 p-l-16 p-r-16 p-t-10 p-b-10 bg-white border-solid-1 {classes}" type="password" name={name} on:change={onChange} />
    {:else if type === 'text'}
    <input class="border-radius-5 border-color-secondary m-t-5 m-b-5 p-l-16 p-r-16 p-t-10 p-b-10 bg-white border-solid-1 {classes}" type="text" {name} {placeholder} on:keyup={onKeyUp} />
{/if}


<style>
    input{
        outline: none;
    }
</style>