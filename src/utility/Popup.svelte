<script>
    import Button from "../utility/Button.svelte";
    import { fireEvent,EVENTS } from "../EventManager";
    
    export let header;
    export let closeLabel = "Close";
    
    const fireClosePopupEvent = () => {
        fireEvent(EVENTS.CLOSE_POPUP,{});
    }

</script>

<div class="modal-container fixed">
    <div class="modal max-height text-primary absolute border-secondary bg-white border-radius-5 no-outline p-l-20 p-r-20 height-auto w-500-px max-h-85">
        <div class="modal-content relative p-t-32 p-r-32 p-b-32 p-l-32 height-100 bg-white text-primary">
            <div class="modal-header text-medium text-bold m-b-16">{header}</div>
            <slot />
            <div class="flex justify-center">
                <Button classes="text-bold" onClick={fireClosePopupEvent} label={closeLabel} type="primary"/>
            </div>
        </div>
    </div>
</div>

<style>
    .modal-container{
        inset: 0px;
        background: rgba(41,47,76,0.7);
    }

    .modal{
        inset: 10% auto 10% 50%;
        overflow: hidden auto;
        transform: translate(-50%, 0px);
        transition: all 0.3s ease 0s;
        will-change: width;
        box-shadow: rgb(0 0 0 / 70%) 0 25px 50px -15px !important;
    }
</style>