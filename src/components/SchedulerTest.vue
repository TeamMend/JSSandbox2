<template>
  <v-container class="fill-height pa-0">
    <v-sheet class="d-flex align-center fill-height pa-10" color="#f8f9fa" width="100%">
      <v-row>
        <v-col cols="4">
          <ejs-listview
            id="eventsList"
            ref="eventsList"
            :dataSource="eventsDataManager"
            :query="listQuery"
            :fields="listFields"
            :template="'listTemplate'"
            cssClass="e-list-template"
          >
            <template v-slot:listTemplate="{ data }">
              <v-card
                class="mb-4 pa-4"
                :draggable="data.isApproved ? true : false"
                @dragstart="cardDragStart($event, data)"
                @dragend="cardDragStop"
              >
                <!-- Header with avatar and username -->
                <v-card-title class="d-flex align-center justify-space-between">
                  <span class="font-weight-medium" style="text-transform: uppercase">{{
                    data.subject
                  }}</span>
                </v-card-title>
                <v-chip class="ma-2" color="success" label v-show="data.isApproved" alignEnd>
                  <v-icon icon="mdi-check-circle" start></v-icon>
                  Approved
                </v-chip>
                <v-chip class="ma-2" color="red" label v-show="!data.isApproved" alignEnd>
                  <v-icon icon="mdi-label" start></v-icon>
                  Rejected
                </v-chip>

                <!-- Main image
          <v-img :src="data.image" height="300px" class="rounded"></v-img> -->

                <!-- Caption and tags -->
                <v-card-text>
                  <p class="mb-2">{{ data.description }}</p>
                </v-card-text>

                <!-- Timestamp -->
                <v-card-actions>
                  <v-icon small color="grey">mdi-clock-outline</v-icon>
                  <span class="ml-1 text--secondary">{{ getFormattedDate(data.startTime) }}</span>
                </v-card-actions>
              </v-card>
            </template>
          </ejs-listview>
        </v-col>
        <v-col cols="8">
          <ejs-schedule
            :eventSettings="schedulerEventSettings"
            :popupOpen="actionBeginScheduler"
            :actionBegin="actionCompletedScheduler"
            :allowDragAndDrop="true"
            @dragover="schedulerDragOver"
            @drop="schedulerGrabDrop"
            ref="myScheduler"
            :editorTemplate="'editorTemplate'"
            :editorHeaderTemplate="'editorHeaderTemplate'"
            currentView="Month"
            height="650px"
            timezone="UTC"
          >
            <e-views>
              <e-view option="Month"> </e-view>
            </e-views>
            <e-resources>
              <e-resource
                :dataSource="platformData"
                field="platformId"
                idField="id"
                title="Platforms"
                name="Platforms"
                colorField="color"
                textField="name"
                allowMultiple="true"
              >
              </e-resource>
            </e-resources>
            <template v-slot:headerTemplate></template>
            <template v-slot:editorHeaderTemplate="{ data }">
              <div v-show="data.id === null">Create Event</div>
              <div style="text-transform: uppercase" v-show="data.id != null">
                Update Post Scheduling | {{ data.subject }}
              </div>
            </template>
            <template v-slot:editorTemplate>
              <table class="schedule-custom-event-editor" width="100%" cellpadding="5">
                <tbody>
                  <tr>
                    <td class="e-textlabel">Subject</td>
                    <td colspan="4">
                      <input
                        id="subject"
                        class="e-field e-input"
                        type="text"
                        name="subject"
                        readOnly
                        style="width: 100%"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="e-textlabel">Post Time</td>
                    <td colspan="4">
                      <ejs-datetimepicker
                        id="startTime"
                        class="e-field"
                        name="startTime"
                      ></ejs-datetimepicker>
                    </td>
                  </tr>
                  <tr>
                    <td class="e-textlabel">Post Contents</td>
                    <td colspan="4">
                      <textarea
                        id="description"
                        class="e-field e-textarea"
                        name="description"
                        readonly
                        style="width: 100%; height: 75px"
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
          </ejs-schedule>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ref, provide, reactive, onMounted } from 'vue'
import { closest } from '@syncfusion/ej2-base'
import {
  Agenda,
  ScheduleComponent as EjsSchedule,
  Day,
  Week,
  Month,
  TimelineViews,
  TimelineMonth,
  DragAndDrop,
  ViewsDirective as EViews,
  ViewDirective as EView,
  ResourcesDirective as EResources,
  ResourceDirective as EResource,
  type ActionEventArgs,
  type DragEventArgs,
  type PopupOpenEventArgs,
  ScheduleComponent,
} from '@syncfusion/ej2-vue-schedule'

import { ListViewComponent as EjsListview } from '@syncfusion/ej2-vue-lists'

import {
  DateTimePickerComponent as EjsDatetimepicker,
  type events,
} from '@syncfusion/ej2-vue-calendars'

import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data'

// Your Azure Function App endpoint URL
const serviceUrl = 'https://icy-river-0fa400b10.1.azurestaticapps.net/api/jswebapis'

const schedulerQuery = ref(
  new Query().addParams('table', 'scheduled_events').where('isApproved', '==', 1),
)
const listQuery = ref(new Query().addParams('table', 'scheduled_events'))

const listFields = {
  text: 'subject',
}

// Create the DataManager instance
const eventsDataManager = new DataManager({
  url: serviceUrl,
  crudUrl: serviceUrl + '/update',
  adaptor: new UrlAdaptor(),
})

const platformData = ref([
  {
    id: 1,
    color: '#ff0000',
    name: 'YouTube',
  },
  {
    id: 1,
    color: '#0000ff',
    name: 'Twitter',
  },
  {
    id: 1,
    color: '#00ff00',
    name: 'Facebook',
  },
])

const myScheduler = ref<EjsSchedule | null>(null)
const eventsList = ref<EjsListview | null>(null)

const schedulerEventSettings = reactive({
  dataSource: eventsDataManager,
  query: schedulerQuery,
  allowAdding: false,
  fields: {
    id: 'id',
    subject: { title: 'Subject', name: 'subject' },
    description: { title: 'Description', name: 'description' },
    startTime: { title: 'Start Time', name: 'startTime' },
    endTime: { title: 'End Time', name: 'startTime' },
    platformId: { title: 'Platform ID', name: 'platformId' },
  },
})

provide('schedule', [Agenda, TimelineViews, TimelineMonth, Day, Week, Month, DragAndDrop])

interface eventsData {
  id: number
  subject: string
  startTime: Date
  description: string
  isApproved: boolean
  platformId: number
}

let selectedItem: eventsData | null = null
const cardDragStart = (e: DragEvent, item: eventsData) => {
  selectedItem = item
  const chipElement = document.createElement('div')

  // 3. Set the text and style the element to look like a chip
  chipElement.textContent = item['subject']
  chipElement.style.padding = '5px 10px'
  chipElement.style.backgroundColor = '#002564'
  chipElement.style.border = '1px solid #ccc'
  chipElement.style.borderRadius = '16px' // Rounded corners for a chip look
  chipElement.style.fontFamily = 'sans-serif'
  chipElement.style.fontSize = '14px'
  chipElement.style.whiteSpace = 'nowrap' // Prevents text from wrapping

  // Make the element invisible but still in the DOM
  chipElement.style.position = 'absolute'
  chipElement.style.top = '-1000px'
  chipElement.style.left = '-1000px'

  // 4. Append the element to the body
  document.body.appendChild(chipElement)

  // 5. Set the custom drag image
  // The offsets (x, y) can be adjusted to center the cursor
  // on the chip. Using half the width and height is a good starting point.
  const chipWidth = chipElement.offsetWidth
  const chipHeight = chipElement.offsetHeight
  e.dataTransfer?.setDragImage(chipElement, chipWidth / 2, chipHeight / 2)
}

const cardDragStop = (e: DragEvent) => {}

const schedulerDragOver = (e: DragEvent) => {
  e.preventDefault()
}

const schedulerGrabDrop = (e: DragEventArgs) => {
  if (selectedItem?.isApproved != true) {
    return
  }

  if (myScheduler.value) {
    if (e.target?.classList.contains('e-work-cells')) {
      let times: any = myScheduler?.value.getCellDetails(e.target)

      let eventData = {
        id: selectedItem?.id,
        subject: selectedItem?.subject,
        startTime: times?.startTime,
        description: selectedItem?.description,
      }

      myScheduler.value.openEditor(eventData, 'EditOccurrence', true)
    } else {
      return
    }
  }
}

const actionBeginScheduler = (e: PopupOpenEventArgs) => {}

const actionCompletedScheduler = (e: ActionEventArgs) => {}

const getFormattedDate = (d: Date) => {
  if (d === null) {
    return 'Invalid Date'
  }
  return format(d, 'MM/dd/yy HH:mm')
}

const getPlatformInfo = (data: any) => {
  let idx = platformData.value.findIndex((item) => {
    item.id == data.platformId
  })
  return platformData.value[idx]
}
</script>

<style scoped>
.list-template-item {
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #000;
  background-color: #f8f9fa;
}
.list-item-header {
  text-transform: uppercase;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
}
</style>
