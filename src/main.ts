import './assets/main.css'
// Import Syncfusion's CSS styles (use the theme you prefer)
import '@syncfusion/ej2-base/styles/material.css'
import '@syncfusion/ej2-buttons/styles/material.css'
import '@syncfusion/ej2-calendars/styles/material.css'
import '@syncfusion/ej2-dropdowns/styles/material.css'
import '@syncfusion/ej2-inputs/styles/material.css'
import '@syncfusion/ej2-navigations/styles/material.css'
import '@syncfusion/ej2-popups/styles/material.css'
import '@syncfusion/ej2-schedule/styles/material.css' // Scheduler-specific styles
import '@syncfusion/ej2-vue-layouts/styles/material.css'
import '@syncfusion/ej2-vue-calendars/styles/material.css'
import '@syncfusion/ej2-base/styles/material.css'
import '@syncfusion/ej2-vue-lists/styles/material.css'
import '@syncfusion/ej2-vue-navigations/styles/material.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './JSWebApp.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { VDateInput } from 'vuetify/labs/VDateInput'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { registerLicense } from '@syncfusion/ej2-base'

registerLicense(
  'ORg4AjUWIQA/Gnt3VVhhQlJDfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTH5bd0xiUXtbc3BSQGRUWkd2',
)

const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
  },
  directives,
})

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
