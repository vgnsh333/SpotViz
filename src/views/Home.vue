<template>
  <v-container fill-height class>
    <v-row class>
      <v-col class="text-center">
        <div>
          <h1 class="ml7">
            <span class="text-wrapper">
              <span class="letter">S</span>
              <span class="letter">p</span>
              <span class="letter">o</span>
              <span class="letter">t</span>
              <span class="letter">V</span>
              <span class="letter">i</span>
              <span class="letter">z</span>
            
            </span>
           </h1>
        </div>
        <v-row justify="center" align="center" class>
          <v-btn color="primary" @click="btnClick" x-large rounded outlined class="ma-4">
            Log in
            <v-icon class="pl-4">mdi-spotify</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
import anime from "animejs/lib/anime.es.js";
var domainPrefix = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "" ;
export default {
  name: "Home",
  methods: {
    btnClick() {
      // window.location.href =
      //   "https://accounts.spotify.com/authorize" +
      //   "?response_type=code" +
      //   "&client_id=" +
      //   process.env.VUE_APP_CLIENTID +
      //   (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      //   "&redirect_uri=" +
      //   encodeURIComponent(process.env.VUE_APP_REDIRECTURI);
      axios
        .get(domainPrefix+"/login")
        .then(data => {
          console.log(data.data.url);
          window.location.href = data.data.url;
        })
        .catch(error => {
          console.log(error);
          console.log(process.env)
          console.log('port:'+process.env.PORT)
        });
    },
    anim() {
      anime
        .timeline({ loop: false })
        .add({
          targets: ".ml7 .letter",
          translateY: ["1.1em", 0],
          translateX: ["0.55em", 0],
          translateZ: 0,
          rotateZ: [180, 0],
          duration: 1750,
          easing: "easeOutExpo",
          delay: (el, i) => 550 * i
        });
        // .add({
        //   targets: ".ml7",
        //   opacity: 0,
        //   duration: 1000,
        //   easing: "easeOutExpo",
        //   delay: 1000
        // });
    }
  },
  mounted() {
    this.anim();
  },
  components: {}
};
</script>

<style scoped>
.ml7 {
  position: relative;
  font-weight: 500;
  font-size: 4.7em;
  font-family: 'indie flower';
}
.ml7 .text-wrapper {
  position: relative;
  display: inline-block;
  padding-top: 0.2em;
  padding-right: 0.05em;
  overflow: hidden;
}
.ml7 .letter {
  transform-origin: 0 100%;
  display: inline-block;
  line-height: 1em;
}
</style>
