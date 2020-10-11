<template>
<div class="modal fade contacts__modal" id="exampleModalUpdate" tabindex="-1" aria-labelledby="exampleModalLabel"
	aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button 
					type="button" 
					class="close"
					data-dismiss="modal" 
					aria-label="Close"
					ref="close"
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<form class="form-contact" @submit.prevent="updateContact">
				<div class="form-group">
					<label for="exampleInput">Имя</label>
					<input type="text" class="form-control" id="exampleInput" v-model="name" required>
				</div>
				<label for="exampleInput2">Номер телефона</label>

				<phone-mask-input 
					v-model="phone" 
					defaultCountry="ru"
					wrapperClass="form-group"
					inputClass="form-control" :id="'exampleInput2'"
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

export default {
	name: 'UpdateContact',
	props: ['currentContact'],
	data() {
		return {
			name: this.currentContact.name,
			phone: this.currentContact.phone
		}
	},
	methods: {
		updateContact() {
			
			const contactData = {
				name: this.name,
				phone: this.phone,
				id: this.currentContact.id
			}

			this.$store.commit('updateContact', contactData)

			this.$refs.close.click()
		}
	}
}

</script>
