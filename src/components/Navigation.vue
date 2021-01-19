<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    v-if="$store.state.drawerShow"
    color="#121212"
    width="169"
  >
    <!-- -->
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img :src="$store.state.userImage"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{ $store.state.userName }}</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
     <template v-slot:append>
        <div class="pl-1 pb-1 pr-3">
          <v-btn icon block>
           <v-icon >mdi-logout</v-icon>
           </v-btn>
        </div>
      </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "User", icon: "mdi-account", link: "/user" },
        { title: "Search", icon: "mdi-magnify", link:'/search' },
        { title: "Playlist", icon: "mdi-playlist-play", link:'/visualizer' }
      ],
      mini: true
    };
  }
};
</script>