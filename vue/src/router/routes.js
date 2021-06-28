import Login 			from "pages/Login.vue"
/*import Forgot			from "@/pages/Forgot.vue"
import ResetAccount		from "@/pages/ResetAccount.vue"
import Unlock			from "@/pages/Unlock.vue"*/

/*	Status 	*/

export default [
	{
		path: '/',
		redirect: "login",
	},
	{
		path: '/login',
		component: Login,
		name: "Login"
	},
];