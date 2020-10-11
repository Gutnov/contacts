<template>
	<div id="app">
		<router-view/>
	</div>
	
</template>
<script>
import firebase from 'firebase/app'
	export default {
		beforeDestroy() {
			firebase.auth().signOut()
		},
		mounted() {
			window.beforeonunload = async () => {
				await firebase.auth().signOut()
			}
		},
	}
</script>
<style lang="scss">
	@import "~bootstrap/scss/bootstrap";
</style>
