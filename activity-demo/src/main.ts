import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import '@/assets/font/DMFT/font.css'
import '@/assets/font/MiSans-Bold/font.css'
import '@/assets/font/MiSans-Regular/font.css'
import '@/mock/mock'
window.addEventListener('load', () => {
    console.log('load');
    
})
const app = createApp(App)
const pinia = createPinia()
app.use(pinia).mount('#app')

