<template>
  <f7-page>
    <div class="card">
      <div class="card-header">Navigation <a href="#" class="panel-close"><i class="icon icon-back"></i></a></div>
        <div class="card-content">
          <a class="button panel-close" href="/">Home</a>
          <a class="button panel-close" href="/login/">Login</a>
          <a class="button panel-close" href="/signup/">Sign Up</a>
          <a class="button panel-close" href="/secretquote/">Secret Quote</a>
          <a class="button panel-close" href="/login/">Logout</a>
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

  </f7-page>
</template>


<script>
  export default {
      methods:{
        setLayoutTheme(theme) {
            const self = this;
            const app = self.$f7;
            app.root.removeClass('theme-dark theme-light').addClass(`theme-${theme}`);
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