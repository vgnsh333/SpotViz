<template>
  <v-app>
    <transition name="fade">
    <navigation></navigation>
    </transition>
    <!--https://spotviz.herokuapp.com/ | https://git.heroku.com/spotviz.git
  <v-app-bar app>
    
  </v-app-bar>
    -->
    <!-- Sizes your content based upon application components -->

    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class fill-height>
        <!-- If using vue-router -->
          <router-view></router-view>
        
      </v-container>
    </v-main>
  <transition name="fade" appear>
    <appfooter></appfooter>
 </transition>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import navigation from "./components/Navigation";
import footer from "./components/Footer";

export default {
  name: "App",
  components: {
    navigation,
    appfooter: footer
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");
.fade-enter-active, .fade-leave-active {
  transition: opacity 4s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

</style>