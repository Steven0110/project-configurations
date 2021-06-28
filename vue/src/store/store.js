import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		user: 			{},
	},
	mutations: {
		/*	User*/
		setUser(state, user){
			if(state.user.profilePicture)
				user.profilePicture = state.user.profilePicture

			state.user = user
		},
		setUserData(state, {key, value}){
			state.user[ key ] = value
		}
	},
	getters: {
		user: 					state => state.user,
	}

})