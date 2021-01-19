<template>
    <v-footer  style="background-color : #121212;" app v-if="$store.state.footerShow">
      <v-card-text class="py-1 white--text text-center"  >
        <v-btn class="24px mx-4" dark icon href="https://github.com/vgnsh333">
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <v-btn class="mx-4 24px" dark icon href="https://www.twitter.com">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn class="mx-4 24px" dark icon>
          <v-icon>mdi-linkedin</v-icon>
        </v-btn>
        <v-btn class="mx-4 24px" dark icon href="https://www.instagram.com/_madskiez_/">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="pa-0" justify="center" align="center" dense>v0.1</v-card-text>
    </v-footer>
</template>

<script>
export default {
    
}
</script>