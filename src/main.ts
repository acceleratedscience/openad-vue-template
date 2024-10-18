// Carbon design system
// https://v10.carbondesignsystem.com/developing/frameworks/vue
import 'carbon-components/css/carbon-components.css'
import CarbonComponentsVue from '@carbon/vue'

// Main styles
import './assets/main.scss'

// Vue core
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Directives
import clickToCopy from '@/directives/click-to-copy'

// Create app
const app = createApp(App)

// Config app
app.use(createPinia())
app.use(router)
app.use(CarbonComponentsVue)
app.directive('click-to-copy', clickToCopy)

// Mount app
app.mount('#app')
