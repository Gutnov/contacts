<template>
	<div class="contacts">
		<div class="container">
			<div class="dropdown" ref="test">
				<a class="contacts__user" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="false">
					{{currentUser}} <span>&#9660</span>
				</a>

				<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
					<a class="dropdown-item" href="#" @click.prevent="signOut">Выйти</a>
				</div>
			</div>
			<h1>Список контактов</h1>
			<hr>
			<button type="button" class="btn btn-success contacts__add" data-toggle="modal" data-target="#exampleModal">
				Добавить контакт 
			</button>
			<div class="form-group form-group--search">
				<input 
					class="form-control" id="search"
					placeholder="Поиск"
					v-model.trim="search"
				>
				<span class="material-icons">
					search
				</span>
			</div>
			
			<ul class="contacts__list" v-if="contacts.length > 0">
				<li class="contacts-item" v-for="contact in filteredContacts" :key="contact.id">
					<div class="contacts-item__top">
						<h4 class="contacts__name">{{contact.name}}</h4>
						<div class="contacts__phone">{{contact.phone}}</div>
					</div>
					<div class="contacts-item__bottom">
						<button 
							class="btn btn-dark" 
							data-toggle="modal" 
							data-target="#exampleModalUpdate"
							:data-id="contact.id"
							@click="getCurrentContact"
						>
						Редактировать</button>
						<button 
							class="btn btn-danger" 
							@click="removeContact"
							:data-remove="contact.id"
						>
							Удалить
						</button>
					</div>
				</li>
				<li v-if="!filteredContacts.length">Ничего не найдено</li>
			</ul>
			<h2 style="text-align: center" v-else>Список контактов пуст</h2>
			<NewContact />
			<UpdateContact :currentContact="currentContact" :key="Date.now()" />
		</div>
		<a class="fixed-action-btn"  data-toggle="modal" data-target="#exampleModal">
			<i class="large material-icons contacts__plus">add</i>
		</a>
	</div>
</template>

<script>
	import firebase from 'firebase/app'
	import NewContact from '../components/NewContact'
	import UpdateContact from '../components/UpdateContact'

	export default {
		data() {
			return {
				currentUser: firebase.auth().currentUser.email,
				currentContact: {},
				search: ''
			}
		},
		methods: {
			async signOut() {
				await firebase.auth().signOut()
				this.$router.push('/')
			},
			getCurrentContact(e) {
				for(let i of this.contacts) {
					if (i.id == e.target.dataset.id) {
						this.currentContact = i
					}
				}
			},
			removeContact(e) {
				this.$store.commit('removeContact', e.target.dataset.remove)
			}
		},
		computed: {
			contacts() {
				return this.$store.getters.getContacts
			},
			filteredContacts() {
				return this.contacts.filter(contact => contact.name.toLowerCase().indexOf(this.search) !== -1)
			}
			
		},
		components: {
			NewContact, UpdateContact
		}
	}
</script>

<style lang="scss">
	.contacts {
		padding-top: 20px;
		width: 100vw;
		height: 100vh;

		h1 {
			text-align: center;
		}

		.dropdown {
			width: max-content;
			margin-left: auto;
			padding-left: 20px;
		}

		.dropdown-menu {
			padding: 0;
		}

		.contacts__add {
			display: block;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 50px;
		}

		.contacts-item__bottom {
			.btn {
				display: block;
				max-width: 150px;
				margin-left: auto;
				margin-right: auto;
			}
		}

		.contacts__user {
			cursor: pointer;

			&:hover {
				text-decoration: none;
			}

			span {
				display: inline-block;
				font-size: 12px;
				transition: all .3s
			}
		}

		.dropdown-menu {
			min-width: 85%;
		}

		.dropdown.show span {
			transform: rotateZ(180deg);
		}

		.contacts__modal {
			align-items: center;
			padding-right: 0 !important;
		}
		.contacts__modal.show {
			
		}

		.modal-dialog {
			width: 100%;
			max-width: 400px;
			margin: 0 auto;
			margin-top: 50px;
			padding: 0 15px;
		}

		.modal-header {
			padding: 0;
			border: none;
		}

		.close {
			margin-right: -10px;
		}

		.btn-dark,
		.btn-danger {
			font-size: 12px;
			padding: 5px 10px;
			padding-top: 3px;
			font-weight: bold;
		}

		.btn-dark {
			margin-bottom: 20px;
		}
	}

	.contacts__list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 20px;
		padding: 0;

		li {
			list-style: none;
		}
	}

	.contacts-item {
		list-style: none;
		border: 1px solid rgba(0, 0, 0, 0.1);
		padding: 20px;
		padding-top: 10px;
		border-radius: 5px;

		.btn {
			width: 100%;
		}
	}

	.contacts-item-add {
		width: max-content;
		align-self: center;
		justify-self: center;
		cursor: pointer;

		.contacts__add {
			margin-bottom: 0;
		}
	}

	.contacts__name {
		text-align: center;
		margin-bottom: 20px;
	}

	.contacts__phone {
		text-align: center;
		font-size: 17px;
		font-weight: 500;
		padding-bottom: 10px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
	}

	.fixed-action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		position: fixed;
		bottom: 50px;
		right: 10px;
		background-color: green;
		border-radius: 50%;
		cursor: pointer;

		&:hover {
			i{color: #ccc;}
		}

		i {
			font-size: 30px;
			color: #fff;
		}
	}
	.form-group--search {
		position: relative;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 40px;

		span {
			position: absolute;
			right: 10px;
			top: 8px;
		}
	}
	@media (max-width: 991px) {
		.contacts__list {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media(max-width: 768px) {
		.dropdown {
			display: block;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 50px;
		}
	}
	@media (max-width: 475px) {
		.contacts__list {
			grid-template-columns: 1fr;
		}
	}

</style>