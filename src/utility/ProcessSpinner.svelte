<script>
    export let show;
</script>

{#if show}
    <div class="flex justify-center align-center fixed height-full width-full z-index-1 flex-column ">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: transaprent; display: block;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <defs>
            <mask id="ldio-l94j0p085q-mask">
            <circle cx="50" cy="50" r="20" stroke="#fff" stroke-linecap="round" stroke-dasharray="94.24777960769379 31.41592653589793" stroke-width="9">
                <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" times="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
            </circle>
            </mask>
            </defs>
            <g mask="url(#ldio-l94j0p085q-mask)"><rect x="20.5" y="0" width="59" height="100" fill="#464646">
            <animate attributeName="fill" values="#464646" times="0" dur="1s" repeatCount="indefinite" begin="0s"></animate>
            </rect></g>
        </svg>
    </div>
{/if}
