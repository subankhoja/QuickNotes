<script>
    export let name;
    export let OnClick;
</script>

<span class="flex justify-center align-center pointer" title={name} on:click={OnClick}>
    {#if name === 'delete'}
        <svg width="20px" height="20px" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12.592 3.22l.1.088c.412.412.412 1.08-.007 1.498L9.491 8l3.194 3.194c.384.384.418.982.095 1.398l-.088.1a1.057 1.057 0 0 1-1.498-.007L8 9.491l-3.194 3.194a1.056 1.056 0 0 1-1.498.007 1.057 1.057 0 0 1 .007-1.498L6.509 8 3.315 4.806a1.058 1.058 0 0 1-.095-1.398l.088-.1a1.057 1.057 0 0 1 1.498.007L8 6.509l3.194-3.194a1.058 1.058 0 0 1 1.398-.095z"></path></svg>
    {/if}
</span>