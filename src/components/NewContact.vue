<template>
	<div class="modal fade contacts__modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<form class="form-contact" @submit.prevent="addContact">
					<div class="form-group">
						<label for="exampleInputNew">Имя</label>
						<input 
							type="text" 
							class="form-control" 
							id="exampleInputNewName" 
							v-model="name"
							required
						>
					</div>
					<label for="exampleInputNewPhone">Номер телефона</label>
					<phone-mask-input 
						v-model="phone" 
						defaultCountry="ru" 
						wrapperClass="form-group"
						inputClass="form-control"
						:id="'exampleInputNewPhone'" 
						:key="key" 
					/>
					<button type="submit" class="btn btn-primary">
						Сохранить
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import PhoneMaskInput from "vue-phone-mask-input";

export default {
	name: 'Contact',
	data() {
		return {
			phone: '',
			name: '',
			key: ''
		}
	},
	methods: {
		addContact() {
			const contactData = {
				name: this.name,
				phone: this.phone,
				id: Date.now()
			}

			this.$store.commit('addContact', contactData)

			this.phone = ''
			this.name = ''
			this.key = Date.now()
			this.$refs.close.click()
		}
	},
	mounted() {
	}
}
</script>

<style lang="scss">
	.form-contact {
		padding: 20px;

		.btn-primary {
			width: 100%;
		}
	}
</style>