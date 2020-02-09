<template>
  <f7-page>
    <div class="card">
      <div class="card-header">Navigation <a href="#" class="panel-close"><i class="icon icon-back"></i></a></div>
        <div class="card-content">
          <a class="button panel-close" href="/">Home</a>
          <a class="button panel-close" href="/login/">Login</a>
          <a class="button panel-close" href="/signup/">Sign Up</a>
          <a class="button panel-close" href="/secretquote/">Secret Quote</a>
        </div>
    </div>


      <div class="card">
        <div class="card-header">Are you a developer?</div>
        <div class="card-content">
            <f7-row>
              <f7-col width="50"  @click.native="setLayoutTheme('light')">
                <a href="#" class="button">No</a>
              </f7-col>
              <f7-col width="50"  @click.native="setLayoutTheme('dark')">
                <a href="#" class="button">Yes</a>
              </f7-col>
          </f7-row>
      </div>
    </div>
    <div v-if="user.name">
      <a class="button panel-close" v-on:click="logout"> logout</a>
      </div>


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
      methods:{
        setLayoutTheme(theme) {
            const self = this;
            const app = self.$f7;
            app.root.removeClass('theme-dark theme-light').addClass(`theme-${theme}`);
          },
          logout: function () {
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
          }
      }
  };
</script>

<style scoped>
  .card-content>a{
    text-align: left;
  }
  f7-row f7-col{
    cursor: pointer;
    padding: 30px; 
    text-align: center
  }
</style>