<script>
    export let type;
    export let alt;
    export let src;
    export let classes;
</script>

<img class={classes} data-type={type} src={src} alt={alt}/>

<style>
    img[data-type="logo"]{
        height: 26px;
	    width: 32px;
    }
</style>