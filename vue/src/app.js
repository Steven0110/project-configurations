import Vue from "vue"

import App from "./App.vue"
import router from "./router"

//Vue.use( VueAxios, instance )

/*	Sweet Alert 2 	*/
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
const options = {
	confirmButtonColor: '#3f9690',
	cancelButtonColor: '#db5756'
}
Vue.use( VueSweetalert2, options )

/*	Vue Moment 	*/
const moment = require('moment')
require('moment/locale/es')
 
Vue.use(require('vue-moment'), {
    moment
})

/*	Axios 	*/
import axios from '@/plugins/axios'

/*	Vuetify 	*/
import vuetify from '@/plugins/vuetify'
/*	Vuex 	*/
import { store } from '@/store/store'

/*	Sentry 	*/
/*import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
Sentry.init({
  dsn: 'https://432d68195ee04dbc8f568c85a103f17b@o505235.ingest.sentry.io/5593166',
  integrations: [new VueIntegration({Vue, attachProps: true})],
  environment: process.env.ENV
});
Vue.prototype.$sentry = Sentry*/

/*	Mixin 	*/
import mixin from "@/mixins/mixin"
Vue.mixin( mixin )

/*	Global variables 	*/
//Vue.prototype.FS = process.env.FILESERVER

new Vue({
	el: "#app",
	router,
	vuetify,
	store,
	render: h => h( App ),
})