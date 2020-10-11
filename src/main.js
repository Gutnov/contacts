import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import "bootstrap"

Vue.config.productionTip = false

Vue.use(Vuelidate)

firebase.initializeApp({
 	apiKey: "AIzaSyBrewhHazbuq2rhFL-nxgNEYNO674Kwkxg",
 	authDomain: "tekeoff-20830.firebaseapp.com",
 	databaseURL: "https://tekeoff-20830.firebaseio.com",
 	projectId: "tekeoff-20830",
 	storageBucket: "tekeoff-20830.appspot.com",
 	messagingSenderId: "330221190357",
 	appId: "1:330221190357:web:a4a841534b87f9df78765c",
 	measurementId: "G-C81NGH94FT"
})

let app;

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount("#app");
	}	
})



