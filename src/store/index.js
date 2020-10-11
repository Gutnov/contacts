import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		contacts: JSON.parse(localStorage.getItem('contacts') || '[]')
	},
	mutations: {
		addContact(state, contactData) {
			state.contacts.push(contactData)

			localStorage.setItem('contacts', JSON.stringify(state.contacts))
		},

		updateContact(state, {name, phone, id}) {
			const copyContacts = [...state.contacts];

			const currentIndex = copyContacts.findIndex(c => c.id == id)

			copyContacts[currentIndex] = {
				...copyContacts,
				name,
				phone
			}

			state.contacts = copyContacts
			console.log(state.contacts)
		},
		removeContact(state, id) {
			const copyContacts = [...state.contacts]

			const index = copyContacts.findIndex(c => c.id == id)

			copyContacts.splice(index, 1)

			state.contacts = copyContacts
			localStorage.setItem('contacts', JSON.stringify(state.contacts))
		}
	},
	actions: {
		async login({ dispatch }, { email, password }) {
			try {
				await firebase
					.auth()
					.signInWithEmailAndPassword(email, password);
			} catch (error) {
				throw error;
			}
		}
	},
	getters: {
		getContacts: s => s.contacts
	},
	modules: {
		
	}
});
