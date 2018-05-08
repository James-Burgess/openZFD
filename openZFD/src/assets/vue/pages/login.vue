  <!-- src/components/Login.vue -->

  <template>
    <f7-page>
    <div>
      <h2>Log in</h2>
      <button @click="login()">Log in</button>
      <button @click="logout()">Log out</button>
    </div>
    <div>
    <h4 v-if="authenticated">
        You are logged in!
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="login()">Log In</a> to continue.
    </h4>
  </div>
  </f7-page>
  </template>

  <script>
  import {webAuth} from '../../../main'

  export default {
    data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated
    }
  },
    mounted() {
      // Parse the hash
      if (window.location.hash) {
        webAuth.parseHash({ hash: window.location.hash }, function(err, authResult) {
          console.log('authResult');
          if (err) {
            return console.log(err);
          }
          if (authResult) {
            webAuth.client.userInfo(authResult.accessToken, function(err, user) {
              localStorage.setItem('profile', JSON.stringify(user))
              localStorage.setItem('id_token', authResult.idToken)
              console.log(authResult);
            
            });
          }
        });
      }
    },
    methods: {
      login() {
        // Redirect to the login page
        webAuth.authorize();
      },
      setSession (authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        )
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)
        localStorage.setItem('expires_at', expiresAt)
        this.authNotifier.emit('authChange', { authenticated: true })
      },
      logout () {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        this.userProfile = null
        this.authNotifier.emit('authChange', false)
        // navigate to the home route
        router.replace('home')
      },
      isAuthenticated () {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
        return new Date().getTime() < expiresAt
      }
    }
  }

  </script>