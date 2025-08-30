<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import MyCard from '../components/MyCard.vue'
import { transform } from 'typescript'

// design of data object
interface MyItem {
  id: number | null
  dateReview: Date | null
  copyCount: string | null
  overallScore: number | null
  comments: string | null
}

const isFormValid = ref(false)
const newItem = ref<MyItem>()
const items = ref<MyItem[]>([])
const error = ref('')
const alert = ref(false)
const API_BASE_URL = 'http://localhost:7071/api/jswebapis'

newItem.value = {
  id: null,
  dateReview: null,
  copyCount: null,
  overallScore: null,
  comments: null,
}

const checkForNulls = (v: any) => {
  if (v === null) {
    return 'This field is required'
  } else {
    return true
  }
}

const onSubmitHandle = (e: Event) => {
  console.log(e)
  console.log(newItem.value)
  if (isFormValid.value === null || isFormValid.value === false) {
    return
  } else {
    addItem()
  }
}

// Function to add a new item
const addItem = async () => {
  if (newItem.value === null) return

  try {
    let formattedDate = null

    if (newItem.value?.dateReview === null) {
      formattedDate = null
    } else {
      let tempDate = newItem.value?.dateReview
      formattedDate =
        tempDate!.getFullYear().toString() +
        '-' +
        (tempDate!.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        tempDate!.getDay().toString().padStart(2, '0')
    }

    const response = await axios.post(API_BASE_URL, {
      item: {
        dateReview: formattedDate,
        copyCount: newItem.value?.copyCount,
        overallScore: newItem.value?.overallScore,
        comments: newItem.value?.comments,
      },
    })

    items.value.push(response.data)
    newItem.value = {
      id: null,
      dateReview: null,
      copyCount: null,
      overallScore: null,
      comments: null,
    }
    alert.value = true
  } catch (err) {
    error.value = 'Failed to add the item.'
    console.error(err)
  }
}
</script>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-sheet class="d-flex align-center fill-height pa-10" width="100%" color="#f8f9fa">
      <v-row>
        <v-col cols="4">
          <MyCard
            :custom-card-class="{
              backgroundColor: '#002564',
              color: '#fff',
              fontVariant: 'small-caps',
              alignContent: 'center',
              height: '100%',
              width: '100%',
            }"
            :custom-card-header-styles="''"
            :custom-card-text-styles="{ textAlign: 'center', fontVariant: 'small-caps' }"
            cardTitle=""
            cardSubTitle=""
            cardContents="My professor provided me a project with more questions than I had answers. Fair enough. I
        decided it was time to grade his performance. My new rubric covers everything from home many
        times he plagarized my one liners without credit to rating his overall quickness in response
        to my messages. I’m looking forward to our next class—I have a lot of feedback to share."
          >
            <template v-slot:contents>
              <span class="d-flex justify-center">
                <v-icon icon="mdi-emoticon-devil-outline" size="100px" color="#fff"> </v-icon>
              </span>
            </template>
          </MyCard>
        </v-col>
        <v-col cols="8">
          <MyCard
            :custom-card-class="{ height: '100%', width: '100%' }"
            :custom-card-header-styles="{
              textAlign: 'center',
              textTransform: 'uppercase',
              color: '#002564',
            }"
            :custom-card-text-styles="''"
            cardTitle="Professor B's Grades"
            cardSubTitle=""
            cardContents=""
          >
            <template v-slot:contents>
              <v-alert
                v-model="alert"
                text="Your item has been succesfully submitted!"
                type="success"
                title="WOOHOOO"
                closable
              >
              </v-alert>
              <v-form class="pa-10" v-model="isFormValid" @submit.prevent="onSubmitHandle">
                <v-date-input
                  label="Date of Review"
                  prepend-icon=""
                  prepend-inner-icon="$calendar"
                  v-model="newItem!.dateReview"
                  :rules="[checkForNulls]"
                  clearable
                >
                </v-date-input>
                <v-row>
                  <v-col cols="6">
                    <v-select
                      :items="['1', '2', '3', '4', '5', 'Greater than 5']"
                      label="Times he plagarized my one-liners?"
                      v-model="newItem!.copyCount"
                      required
                      :rules="[checkForNulls]"
                      clearable
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      :items="[1, 2, 3, 4, 5]"
                      label="Overall Score?"
                      v-model="newItem!.overallScore"
                      required
                      :rules="[checkForNulls]"
                      clearable
                    ></v-select>
                  </v-col>
                </v-row>
                <v-textarea label="Comments?" v-model="newItem!.comments"> </v-textarea>
                <v-btn class="me-4" type="submit" color="#002564">Submit</v-btn>
                <v-btn>Cancel</v-btn>
              </v-form>
            </template>
          </MyCard>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<style></style>
