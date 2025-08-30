<script setup lang="ts">
import { ref } from 'vue'
import scoreGrid from '../tables/scoreGrid.vue'
import about from '../views/AboutView.vue'

const step = ref(null)
</script>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-sheet class="d-flex align-center fill-height pa-10" color="#f8f9fa" width="100%">
      <v-row cols="4" align="center">
        <v-col class="align-center">
          <h1 style="color: #002564; font-variant: small-caps">
            The Homework Assignment I Never Asked For
          </h1>
        </v-col>
        <v-col cols="8">
          <v-tabs v-model="step" bg-color="#002564" align-tabs="center">
            <v-tab value="1">How did we get here?</v-tab>
            <v-tab value="2">Prof B's Scores</v-tab>
          </v-tabs>
          <v-tabs-window v-model="step">
            <v-tabs-window-item value="1">
              <about></about>
            </v-tabs-window-item>
            <v-tabs-window-item value="2">
              <scoreGrid></scoreGrid>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
