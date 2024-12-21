import { data } from './worker.ts'
console.log('🚀 ~ data:', data)
const workerUrl = new URL('./worker.js', import.meta.url)

const worker = new Worker(workerUrl.href, { type: 'module' })

worker.onmessage = function (messageEvent) {
    console.log('messageEvent', messageEvent)
}
setTimeout(() => {
    console.log('🚀 ~ worker:', worker)
    worker.postMessage({ type: 'main' })
}, 100)
