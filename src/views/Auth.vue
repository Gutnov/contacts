<template>
	<div class="container">
			<h1 class="title-auth">Contacts App</h1>
			<form class="form-auth" @submit.prevent="submitHendler">
				<div class="form-auth__alert fade" :class="{show: alertShow, hide:alertShow}">
					Выполните авторизацию
				</div>
				<div class="form-group">
					<label for="exampleInputEmail1">Email</label>
					<input 
						class="form-control" id="exampleInputEmail1"
						:class="{'is-invalid': $v.email.$error}"
						aria-describedby="emailHelp"
						placeholder="Введите email"
						v-model.trim="email"
						@input="correctEmail = true"
						>
						<div id="validationServer03Feedback" class="invalid-feedback">
							<span v-if="!$v.email.required"> Введите email</span>
							<span v-if="!$v.email.email">Некорректный email</span>
							<span v-if="!correctEmail">Пользователь с таким email не существует</span>
						</div>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Пароль</label>
					<input type="password"
						class="form-control"
						:class="{'is-invalid': $v.password.$error}"
						v-model.trim="password"
						@input="correctPassword = true"
						id="exampleInputPassword1"
						placeholder="Введите пароль"
					>
					<div id="validationServer03Feedback" class="invalid-feedback">
						<span v-if="!$v.password.required"> Введите пароль</span>
						<span v-if="!$v.password.minLength">Длина пароля должна быть не меньш 6 символов</span>
						<span v-if="!correctPassword">Неверный пароль</span>
					</div>
				</div>
				<button type="submit" class="btn btn-primary">Войти</button>
			</form>
		</div>
</template>

<script>
import firebase from 'firebase/app'
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
	data() {
		return {
			email: '',
			password: '',
			alertShow: true,
			correctEmail: true,
			correctPassword: true
		}
	},
	validations: {
		email: {
			required,
			email,
			correct() {
				return this.correctEmail
			}
		},
		password: {
			required, 
			minLength: minLength(6),
			correct() {
				return this.correctPassword
			}
		},
	},
	methods: {
		async submitHendler() {
			if (this.$v.$invalid) {
				this.$v.$touch()
				console.log(this.$v)
				return
			}
			const formData = {
				email: this.email,
				password: this.password
			}
			try {
				await this.$store.dispatch('login', formData)
				this.$router.push('/contacts')
			} catch (error) {
				if(error.code === 'auth/wrong-password') {
					this.correctPassword = false;
					this.$v.$touch()
				}
				if(error.code === 'auth/user-not-found') {
					this.correctEmail = false;
					this.$v.$touch()
				}
			}
		}
	},
	mounted() {
		setTimeout(() => {
			this.alertShow = false
		}, 3000);
	},
	
}
</script>


<style lang="scss">
	.title-auth {
		text-align: center;
		margin-bottom: 50px;
		margin-top: 50px;
	}
	.form-auth {
		max-width: 500px;
		width: 100%;
		background-color: #fff;
		padding: 40px 20px;
		border-radius: 5px;
		position: relative;
		border: 1px solid #ced4da;
		margin: 0 auto;

		.form-group {
			position: relative;
		}
		.invalid-feedback {
			position: absolute;
			bottom: -20px;
			left: 0;
		}

		.btn 
		{
			display: block;	
			margin: 0 auto;
			padding-left: 40px;
			padding-right: 40px;
		}

		.form-group {
			margin-bottom: 50px;
			input{min-height: 50px;}
		}
	}
	.form-auth__alert {
		width: 100%;
		position: absolute;
		top: 10px;
		left: 0;
		text-align: center;
		color: red;
	}
</style>