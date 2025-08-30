<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'

const getFormattedDate = (d: Date) => {
  const theMonth = d.getMonth().toString()
  const theDay = d.getDate().toString()
  const theYear = d.getFullYear().toString()

  return theMonth + '/' + theDay + '/' + theYear
}

const getScoreColor = (s: number) => {
  let color = ''

  if (s == 1) {
    color = 'red'
  } else if (s == 2) {
    color = 'default'
  } else if (s == 3) {
    color = 'secondary'
  } else if (s == 4) {
    color = 'primary'
  } else if (s == 5) {
    color = 'green'
  } else {
    color = '#ffffff'
  }

  return color
}

// design of data object
// interface MyItem {
//   id: number | null
//   day: Date | null
//   copies: string | null
//   score: number | null
//   comments: string | null
// }

// const items = ref<MyItem[]>([])
// items.value = [
//   { id: 1, day: new Date(2025, 8, 1), copies: '5', score: 5, comments: '' },
//   { id: 2, day: new Date(2025, 8, 2), copies: '5', score: 1, comments: '' },
//   { id: 3, day: new Date(2025, 8, 3), copies: '5', score: 2, comments: '' },
//   { id: 4, day: new Date(2025, 8, 4), copies: '5', score: 3, comments: '' },
//   { id: 5, day: new Date(2025, 8, 5), copies: '5', score: 5, comments: '' },
// ]

const items = [
  { id: 1, day: new Date(2025, 8, 1), copies: '5', score: 5, comments: '' },
  { id: 2, day: new Date(2025, 8, 2), copies: '5', score: 1, comments: '' },
  { id: 3, day: new Date(2025, 8, 3), copies: '5', score: 2, comments: '' },
  { id: 4, day: new Date(2025, 8, 4), copies: '5', score: 3, comments: '' },
  { id: 5, day: new Date(2025, 8, 5), copies: '5', score: 5, comments: '' },
]

const headers = [
  {
    title: 'DATE',
    align: 'start',
    value: 'day',
  },
  {
    title: 'TIMES MY ONE-LINERS WERE COPIED',
    align: 'start',
    value: 'copies',
  },
  {
    title: 'OVERALL SCORE',
    align: 'center',
    value: 'score',
  },
]

const pageNumber = (v: any) => {
  console.log(v)
}

const API_BASE_URL = 'http://localhost:7071/api/jswebapis'
const getData = async () => {}
</script>

<template>
  <v-data-table
    :items="items"
    :headers="headers"
    item-key="id"
    class="pa-5"
    items-per-page="5"
    @update:options="pageNumber"
  >
    <template v-slot:item.day="{ value }">
      <span>{{ getFormattedDate(value) }}</span>
    </template>
    <template v-slot:item.score="{ value }">
      <v-chip :color="getScoreColor(value)" :text="value" flat> </v-chip>
    </template>
  </v-data-table>
</template>
