  <!-- src/components/Login.vue -->

  <template>
    <f7-page>

      <f7-navbar> 
      <f7-nav-left>
         <f7-link class="panel-open" open-panel="left" icon="fa fa-bars"></f7-link>
         </f7-nav-left>
        <div class="title">openZFD</div>
    </f7-navbar>
    
    <f7-block-title>{{user.name ? "hello " : "You need to be authorised to use this app, Please login to be cool"}}{{ user.name }}</f7-block-title>

    <div v-if="!user.name">
        <button @click="login()">Log in</button>
    </div>


    <div class="card">
      <f7-list>
        <f7-list-group v-if="user.name">
            <f7-list-button color="blue" v-on:click="showUserInfo">Show me what you got</f7-list-button>
        </f7-list-group>
      </f7-list>
    </div>

    <f7-list>
      <f7-list-group v-if="user.email">
        <f7-list-item> Name: {{ user.name }} </f7-list-item>
        <f7-list-item> Email: {{ user.email }} </f7-list-item>        
        <f7-list-item> <div>DicPic: <img v-bind:src="user.picture" alt=""></div> </f7-list-item>
      </f7-list-group>      
    </f7-list>

    <div class="card">
      <f7-list>
        <f7-list-group v-if="user.name">
            <f7-list-button color="blue" v-on:click="openTheDoor">OPEN ZEE FUCKING DOOR</f7-list-button>
        </f7-list-group>
      </f7-list>
    </div>

  </f7-page>
  </template>

  <script>
  import {webAuth} from '../../../main'
  import { mapState, mapActions } from 'vuex'

  export default {
    mounted() {
        // check if user is logged in already
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
        if (new Date().getTime() < expiresAt){
          console.log("already logged in")
          this.loginAction();
        }
        // Parse the hash from login to auth0
        else if (window.location.hash) {
          console.log('Logging you in');
          webAuth.parseHash({ hash: window.location.hash }, (err, authResult) => {
          if (err) {
            return console.log(err);
          }
          if (authResult) {
              webAuth.client.userInfo(authResult.accessToken, (err, user) => {

              let expiresAt = JSON.stringify(
                authResult.expiresIn * 1000 + new Date().getTime()
              )

              localStorage.setItem('profile', JSON.stringify(user))
              localStorage.setItem('id_token', authResult.idToken)
              localStorage.setItem('expires_at', expiresAt)
              localStorage.setItem('name', authResult.idTokenPayload.name)
              localStorage.setItem('picture', authResult.idTokenPayload.picture)
              localStorage.setItem('email', authResult.idTokenPayload.email)

              console.log("Logged In");
              this.loginAction();
            });
          }
        });
       
      }
    },
    computed: {
        ...mapState({
            user: state => state.user
        })
      },


    methods: {
      login() {
        // Redirect to the login page
        webAuth.authorize();
      },
      
      logout () {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        localStorage.removeItem('profile')
        localStorage.removeItem('name')
        localStorage.removeItem('picture')
        localStorage.removeItem('email')
        // refresh to home
        location.href = '/';
      },

      showUserInfo: function() {
        const self = this;

        let name = localStorage.getItem('name');
        let picture = localStorage.getItem('picture');
        let email = localStorage.getItem('email');

        console.log(name, picture, email)
        self.userLogged({email: email, name: name, picture:picture})
      },
      ...mapActions(['userLogged']),

      loginAction() {
        const self = this;
        
        let name = localStorage.getItem('name')
        let picture = localStorage.getItem('picture')
        let email = localStorage.getItem('email')

        console.log(name, picture, email)
        // Set new user into storage
        self.userLogged({name: name, id: "#1"});
        
      },
      ...mapActions(['userLogged'])
    },
    

  }

  </script>

<style scoped>
  img{
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }

</style>




