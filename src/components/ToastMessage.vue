<template>
    <div class="toast-container pe-3 top-0 end-0" >
      <Toast v-for="(msg, key) in message" :key="key"
      :msg="msg"
    />
    </div>
</template>

<script>
import Toast from '../components/Toast.vue'

export default {
  components: { Toast },
  data () {
    return {
      message: []
    }
  },
  inject: ['emitter'],
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.message.push({ style, title, content })
      console.log(this.message)
    })
  }
}
</script>
