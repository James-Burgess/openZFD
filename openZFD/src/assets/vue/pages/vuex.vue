P<template>
  <f7-page>
    <f7-navbar> 
    	<f7-nav-left>
         <f7-link class="panel-open" open-panel="left" icon="fa fa-bars"></f7-link>
         </f7-nav-left>
        <div class="title">openZFD</div>
    </f7-navbar>
    <f7-block-title>{{user.name ? "hello " : "Please login"}}{{ user.name }}</f7-block-title>
    	<f7-list>
			<f7-list-group v-if="user.name">
				<f7-list-item>ID: {{user.id}}</f7-list-item>
			  	<f7-list-item>Username: {{user.name}}</f7-list-item>
			</f7-list-group>
		</f7-list>	

    	<f7-list>
		  <f7-list-button color="blue" v-on:click="loginAction">Login Button</f7-list-button>
		</f7-list>

		
  </f7-page>

</template>
<script>
	import { mapState, mapActions } from 'vuex'

  export default {
  	computed: {
        ...mapState({
            user: state => state.user
        })
    },
		methods: {
			loginAction: function() {
				const self = this;
				// Set new user into storage
        		self.userLogged({name: "James", id: "#1"});
        		let el = document.getElementById('login-screen');
        		app.loginScreen.open(el, true)
			},
			...mapActions(['userLogged'])
		}
  };
</script>
<style scoped>
	
</style>