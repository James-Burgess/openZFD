<template>
  <f7-page>
      <div class="card">
        <div class="card-header">Are you a developer?</div>
        <div class="card-content">
            <f7-row>
              <f7-col width="50"  @click.native="setLayoutTheme('light')" style="cursor: pointer; padding: 30px; text-align: center">No</f7-col>
              <f7-col width="50"  @click.native="setLayoutTheme('dark')" style="cursor: pointer; padding: 30px; text-align: center">Yes</f7-col>
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
