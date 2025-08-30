<script setup lang="ts">
const props = defineProps<{
  cardTitle: string
  cardSubTitle: string
  cardContents: string
  customCardClass: object | string
  customCardHeaderStyles: object | string
  customCardTextStyles: object | string
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
<!-- <template v-slot:title>
        {{ cardTitle }}
    </template>
    <template v-slot:subtitle>
        {{ cardSubTitle }}
    </template v-slot:subtitle>
    <template v-slot:text>
        {{ cardContents }}
    </template v-slot:text> -->
<!-- <v-card :title="cardTitle" :subtitle="cardSubTitle" :text="cardContents" ></v-card> -->
