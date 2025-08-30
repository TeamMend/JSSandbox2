<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'

const navShow = ref(false)
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2" app height="50" color="#002564">
      <!-- <v-app-bar-nav-icon @click.stop="navShow = !navShow"></v-app-bar-nav-icon>
      <v-app-bar-title style="text-transform: uppercase"
        >Unsolicited Work, Now With Deadlines</v-app-bar-title
      > -->
    </v-app-bar>
    <v-navigation-drawer v-model="navShow" temporary>
      <v-list-item link to="/" title="HOME"></v-list-item>
      <v-list-item link to="form" title="ADD REVIEW"></v-list-item>
      <v-list-item link to="scheduler" title="SCHEDULER"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<style scoped></style>
