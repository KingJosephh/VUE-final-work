<template>
    <navBar></navBar>
    <router-view></router-view>
</template>

<script>
import navBar from '../components/NavBare.vue'

export default {
  components: {
    navBar
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
