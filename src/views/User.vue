<template>
  <v-container fill-height app style="font-family: 'indie flower';">
    <v-row no-gutters>
      <v-col fill-height cols="12" align="center">
        <v-avatar height="160px" width="160px">
        
          <v-img v-if="userData.images[0]" :src="userData.images[0].url" height="160px" width="160px"></v-img>
          
          <v-img v-else src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        
        </v-avatar>
        <p style="font-size:2rem;" align="center">{{userData.display_name}}</p>
        </v-col>
      <v-col cols="12" class="text-center" style="font-size:1.5rem">
        <p>Country: {{userData.country}}</p>
        <p>Email: {{userData.email}}</p>
        <p>ID: {{userData.id}}</p>
      </v-col>
      </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      userData: {
        country: "",
        display_name: "",
        email: "",
        id: "",
        images: "",
        product: "",
        type: "",
        uri: "",
        external_urls: {},
        explicit_content: {}
      }
    };
  },
  beforeCreate() {
    this.spotify.getMe().then(data => {
      this.userData = data.body;
      this.$store.state.userName = this.userData.display_name;
      this.$store.state.userImage = this.userData.images[0].url;
      console.log(this.userData);
    });
    this.spotify.getUserPlaylists()
  .then(function(data) {
    console.log('Retrieved playlists', data.body);
  },function(err) {
    console.log('Something went wrong!', err);
  });
  }
};
</script>

<style scoped>
</style>