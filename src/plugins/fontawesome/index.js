import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserTie,faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserTie)
library.add(faThumbsUp)
Vue.component('font-awesome-icon', FontAwesomeIcon)