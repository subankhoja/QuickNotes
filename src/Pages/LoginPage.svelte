<script>
    import Badge from "../utility/Badge.svelte";
    import LoginForm from "../Forms/LoginForm.svelte";
    import { signinUser } from "../firebase";
    import {fireEvent,EVENTS,registerListener} from "../EventManager";
    import { onMount } from "svelte";
    import {requestAccess} from '../utility/api';
    import { MESSAGE } from '../constants';

    const onSignIn = (user_detail) => {
        fireEvent(EVENTS.SHOW_SPINNER,{});
        const email = user_detail.email;
        const password = user_detail.password;
        signinUser(email,password)
        .then (res => {
            // createLog('Log in','','LOG','Log in successfully',LOG_GROUP);
        })
        .catch(err => {
            fireEvent(EVENTS.HIDE_SPINNER,{});
            //createLog('Sign in','19','ERROR',err,ERROR_GROUP);
            fireEvent(EVENTS.SHOW_TOAST,{
                message : MESSAGE.INVALID_CREDS
            });
        });
    }

    const onRequestAccess = (user_detail) => {
        fireEvent(EVENTS.SHOW_SPINNER,{});
        requestAccess(user_detail.email)
            .then(res => {
                if(res && res.success){
                    fireEvent(EVENTS.SHOW_TOAST,{
                        message : MESSAGE.REQUEST_SUCCESS
                    });
                }else{
                    fireEvent(EVENTS.SHOW_TOAST,{
                        message : MESSAGE.GENERIC_ERROR_MSG
                    });
                }
                fireEvent(EVENTS.HIDE_SPINNER,{});
            })
            .catch(err => {
                fireEvent(EVENTS.SHOW_TOAST,{
                    message : MESSAGE.GENERIC_ERROR_MSG
                });
                fireEvent(EVENTS.HIDE_SPINNER,{});
            });
    }

    onMount(() => {
        registerListener(EVENTS.USER_LOGIN,onSignIn);
        registerListener(EVENTS.USER_ACCESS_APP,onRequestAccess);
    })
</script>

<style>

</style>

<div class="flex flex-column height-full">
    
    <LoginForm on:sign_in={onSignIn}/>
    
    <div class="fixed right-10 top-10">
        <Badge label="Suban Khoja" />
    </div>
</div>