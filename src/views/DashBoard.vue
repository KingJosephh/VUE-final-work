<template>
  <div>
    <navBar></navBar>
    <div class="container-fluid">
      <router-view/>
    </div>
    <div class="container-fluid mt-3 position-relative">
      <ToastMessage></ToastMessage>
    </div>
  </div>
</template>

<script>
import navBar from '../components/NavBare.vue'
import emitter from '@/method/mitt'
import ToastMessage from '@/components/ToastMessage.vue'

export default {
  components: {
    navBar,
    ToastMessage
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    // 從cookie取出token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1'
    )
    // 將token加入header
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api, this.user)
      .then((res) => {
        console.log(res)
        if (!res.data.success) {
          this.$router.push('/login')
        }
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>
