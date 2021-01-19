<template>
  <v-container app>
    <v-row dense justify="center" align="center">
      <fingerprint-spinner :animation-duration="1500" :size="256" color="white" />
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { FingerprintSpinner } from "epic-spinners";
var domainPrefix = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "" ;
export default {
  methods: {
    aa() {
      console.log(this.$route.query.code);
      console.clear();
      var linkk =
        "https://accounts.spotify.com/api/token?grant_type=authorization_code&code=" +
        this.$route.query.code +
        "&redirect_uri=" +
        process.env.VUE_APP_REDIRECTURI +
        "&client_secret=" +
        process.env.VUE_APP_CLIENTSECRET +
        "&client_id=" +
        process.env.VUE_APP_CLIENTID;
      axios
        .post("token?code=" + this.$route.query.code)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.error("Hii" + error);
        });
    },
    me() {
      axios
        .get("/me")
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    FingerprintSpinner
  },
  created() {
    //Production remove localhost:3000
    axios
      .post(domainPrefix+"/token?code=" + this.$route.query.code)
      .then(res => {
        console.log("invue: ", res);
        this.spotify.setAccessToken(res.data.access_token);
        setTimeout(()=>{
  this.$router.push("/user");
        },4000);
        this.$store.state.footerShow = false;
        this.$store.state.drawerShow = true;
        
      })
      .catch(error => {
        console.error("Hii" + error);
      });
  }
};
</script>