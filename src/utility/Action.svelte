<script>
    export let title;
    export let OnClick;
</script>


<span title={title} class="p-l-10 p-r-10 pointer" on:click={OnClick}>
    <svg viewBox="0 0 24 24" class="w-20-px h-20-px p-t-4 p-b-4 p-l-4 p-r-4 border-radius-5 bg-primary">
        <slot/>
    </svg>
</span>
