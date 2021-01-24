<template>
  <v-app>
    <!--v-app-bar
      app
      color="white"
      light
    >
      <div class="d-flex align-center">
        <v-img
          alt="USAV Chesapeake Region Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo.gif')"
          transition="scale-transition"
          width="40"
        />
        <p>Chesapeake Head Referee Report</p>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://www.chrva.org"
        target="_blank"
        text
      >
        <span class="mr-2">Region Homepage</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar-->

    <v-main>
      <router-view></router-view>
      <!--HelloWorld/-->
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    // HelloWorld // ,
    // test
  },

  data: () => ({
    //
  })
}
</script>
