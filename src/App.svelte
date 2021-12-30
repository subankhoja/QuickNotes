<script>
	import { AUTH } from "./firebase";
	import LoginPage from "./Pages/LoginPage.svelte";
	import AppPage from "./Pages/AppPage.svelte";
	import LoadSpinner from "./utility/LoadSpinner.svelte";
	import ProcessSpinner from "./utility/ProcessSpinner.svelte";
	import Toast from "./utility/Toast.svelte";
	import {helpItems} from './constants';
	
    import {registerListener , EVENTS} from './EventManager';
	import { onMount } from "svelte";
	let ToastState = {
		message : "",
		show : false
	}
	let currentUser;
	
	let initProcess = true;
	let isProcessing = false;

	const hideInitLoad = () =>  {
    	initProcess = false;
		initProcess = initProcess;
	}

	const showInitLoad = () =>  {
    	initProcess = true;
		initProcess = initProcess;
	}

	const showSpinner = () =>  {
    	isProcessing = true;
		isProcessing = isProcessing;
	}

	const hideSpinner = () =>  {
    	isProcessing = false;
		isProcessing = isProcessing;
	}

	AUTH.onAuthStateChanged((user) => {
		if (user && user.uid) {
			setTimeout(() => {
				hideInitLoad();
				currentUser = user;
				ToastState.message = 'Logged in Successfully';
				ToastState.show = true;
			}, 1000);
			
		} else {
			hideInitLoad();
			currentUser = null;
		}
	});

	const hideToast = () => {
		ToastState.message = '';
		ToastState.show = false;
	}

	const showToast = (data) => {
		ToastState.message = data.message;
		ToastState.show = true;
	}

	onMount(() => {
		registerListener(EVENTS.SHOW_SPINNER,showSpinner);
		registerListener(EVENTS.HIDE_SPINNER,hideSpinner);
		registerListener(EVENTS.SHOW_TOAST,showToast);
		registerListener(EVENTS.HIDE_TOAST,hideToast);
		if(!window?.quick_notes?.config){
			window.quick_notes = {
				config : {
					debug_mode : false
				}
			}
		}
	})

</script>

<main>
	{#if ToastState.show}
		<Toast msg={ToastState.message}/>
	{/if}
	
	<LoadSpinner show={initProcess} {helpItems}/>
	<ProcessSpinner show={isProcessing}/>
	{#if currentUser}
		<AppPage {helpItems}/>
		{:else if currentUser === null}
		<LoginPage />
	{/if}
</main>
