<template>
	<f7-page>
		<f7-navbar> 
    		<f7-nav-left>
         		<f7-link class="panel-open" open-panel="left" icon="fa fa-bars"></f7-link>
         	</f7-nav-left>
        	<div class="title">openZFD</div>
    	</f7-navbar>


     
    <h1>Random Word</h1>
    <button id="btn-get-random-word" @click="getRandomWord">Get Random Word</button>
    <p>{{randomWord}}</p>



		
	</f7-page>
</template>

<script>
	import { f7Navbar, f7Page, f7BlockTitle } from 'framework7-vue';
	var VueResource = require('vue-resource');

export default {
  data () {
    return {
      randomWord: ''
    }
  },
  methods: {
    getRandomWord: function() {
        this.randomWord = '...';
        this.$http.get(
            'http://api.wordnik.com:80/v4/words.json/randomWord?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
        ).then(function (response) {
            this.randomWord = response.data.word;
        }, function (error) {
            alert(error.data);
        });
    }
  },
  components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
    },
  };
</script>