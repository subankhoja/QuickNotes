<style>
    .form{
        background-image: url(/login-bg.png);
    }
    .login-form{
        width: 400px;
        height: 400px;
        box-shadow: rgb(0 0 0 / 20%) 0px 0.5px 3px -1px, rgb(0 0 0 / 15%) 0px 5px 30px -10px;
    }
    
</style>

<script>
    import Image from "../utility/Image.svelte";
    import Input from "../utility/Input.svelte";
    import Button from "../utility/Button.svelte";
    import { APP_NAME , email_regex} from "../constants";
    import {fireEvent,EVENTS} from "../EventManager";

    let user_detail = {
        email:"",
        password:""
    }
    const signIn = () => {
        if(user_detail.email && user_detail.password){
            fireEvent(EVENTS.SHOW_SPINNER,{});
            fireEvent(EVENTS.USER_LOGIN,user_detail);
        }else{
            (window.quick_notes.config.debug_mode) &&
            console.error('Please provide Email and Password');
        }
    }

    const requestAccess = () => {
        const newUserEmail = prompt("Please enter your email");
        
        if(newUserEmail){
            if(email_regex.test(String(newUserEmail).toLowerCase())){
                fireEvent(EVENTS.SHOW_SPINNER,{});
                fireEvent(EVENTS.USER_ACCESS_APP,{
                    email : newUserEmail
                });
            }else{
                alert('invalid email address');
            }
        }
    }

    const handleChange = (e) => {
        user_detail[e.target.name] = e.target.value;
    }

</script>

<div class="flex justify-center align-center grow form">
    <div class="login-form border-radius-5 flex justify-center align-center flex-column bg-white p-t-10 p-b-10">
        <div class="flex align-center">
            <Image classes="m-l-4 m-r-4" src="logo.svg" alt="logo" type="logo"/>
            <span class="text-medium text-boldest text-primary">{APP_NAME}</span>
        </div>
        <div class="flex justify-center flex-column align-center m-t-30 w-90-p">
            <div class="flex flex-column w-90-p p-t-10 p-b-10 p-l-16 p-r-16">
                <Input name="email" type="email" label="Email" hasLabel onChange={handleChange}/>
            </div>
            <div class="flex flex-column w-90-p p-t-10 p-b-10 p-l-16 p-r-16">
                <Input name="password" type="password" label="Password" hasLabel onChange={handleChange}/>
            </div>
            <div class="flex flex-column w-90-p p-t-10 p-b-10 p-l-16 p-r-16">
                <Button classes="text-bold" onClick={signIn} label="Login" type="primary"/>
            </div>
            <br />
            <span class="text-primary text-bold">Don't have an Account?</span>
            <div class="flex flex-column w-90-p p-t-10 p-b-10 p-l-16 p-r-16">
                <Button classes="text-bold" onClick={requestAccess} label="Request Access" type="tertiary"/>
            </div>
            
        </div>

    </div>
</div>
