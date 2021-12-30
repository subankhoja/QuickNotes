<script>

    export let label;
    export let onClick;
    export let type;
    export let classes;

</script>


<button data-type={type} class="border-radius-5 p-t-10 p-b-10 p-l-10 p-r-10 m-r-025-em border-solid-1 {classes}" on:click={onClick}>{label}</button>

<style>
    button{
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        font-family: normal;
    }

    button[data-type="primary"]{
        background: var(--theme-color);
        color: var(--primary-color);
    }

    button[data-type="secondary"]{
        color: var(--theme-color);
        background: var(--primary-color);
    }

    button[data-type="tertiary"]{
        color: var(--primary-color);
        border: 1px solid var(--primary-color);
    }
    
</style>