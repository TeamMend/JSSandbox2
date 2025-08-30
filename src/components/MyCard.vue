<script setup lang="ts">
const props = defineProps<{
  cardTitle: string
  cardSubTitle: string
  cardContents: string
  customCardClass: StyleValue
  customCardHeaderStyles: StyleValue
  customCardTextStyles: StyleValue
}>()
</script>

<!-- to reference the prop values passed from parent interface we have to use :title instead of title -->
<template>
  <v-card :style="customCardClass">
    <v-card-item>
      <v-card-title :style="customCardHeaderStyles">{{ cardTitle }}</v-card-title>
      <v-card-subtitle> {{ cardSubTitle }}</v-card-subtitle>
    </v-card-item>
    <slot class="pa-10" id="contents" name="contents"></slot>
    <v-card-text :style="customCardTextStyles">
      {{ cardContents }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import type { StyleValue } from 'vue'
</script>
