  <!-- src/components/Login.vue -->

  <template>
    <div>
      <h2>Log in</h2>
      <button @click="login()">Log in</button>
    </div>
  </template>

  <script>
  import {webAuth} from '../../../main'

  export default {
    ready() {
      // Parse the hash
      if (window.location.hash) {
        webAuth.parseHash({ hash: window.location.hash }, function(err, authResult) {
          if (err) {
            return console.log(err);
          }
          if (authResult) {
            webAuth.client.userInfo(authResult.accessToken, function(err, user) {
              localStorage.setItem('profile', JSON.stringify(user))
              localStorage.setItem('id_token', authResult.idToken)
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
      logout() {
        // Remove the profile and token from localStorage
        localStorage.removeItem('profile')
        localStorage.removeItem('id_token')
      }
    }
  }

  </script>