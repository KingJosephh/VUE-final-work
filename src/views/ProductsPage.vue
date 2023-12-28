<template>
  <Loading :active="isLoading"></Loading>
  <div class="container-fluid">
    <div class="text-end">
      <button type="button" class="btn btn-primary" @click.prevent="openModal(true)">
    新增產品
    </button>
    </div>
    <table class="table mt-4">
<thead>
    <tr>
    <th width="120">分類</th>
    <th>產品名稱</th>
    <th width="120">原價</th>
    <th width="120">售價</th>
    <th width="100">是否啟用</th>
    <th width="200">編輯</th>
    </tr>
</thead>
<tbody>
    <tr v-for="item in products" :key="item.id">
    <td>{{ item.category}}</td>
    <td>{{ item.title }}</td>
    <td class="text-right">
        {{ item.origin_price}}
    </td>
    <td class="text-right">
        {{ item.price }}
    </td>
    <td>
        <span class="text-success" v-if="item.is_enable">啟用</span>
        <span class="text-muted" v-else>未啟用</span>
    </td>
    <td>
        <div class="btn-group">
        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
        <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
        </div>
    </td>
    </tr>
</tbody>
</table>
  </div>
<ProductModal ref="productModal" :product="tempProduct" @updated-product="updatedProduct"></ProductModal>
<DelModal ref="delModal" :item="tempProduct" @del-item="delProduct"></DelModal>
</template>

<script>
import ProductModal from '../views/ProductModal.vue'
import DelModal from '../views/DelModal.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelModal
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data)
            this.products = res.data.products
            this.pagination = res.data.pagination
          }
          this.isLoading = false
        }).catch((err) => {
          console.log(err)
        })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    openDelModal (item) {
      this.tempProduct = { ...item }
      const productDelComponent = this.$refs.delModal
      productDelComponent.showModal()
    },
    updatedProduct (item) {
      this.tempProduct = item
      let httpMethod = 'post'
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      if (!this.isNew) {
        httpMethod = 'put'
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      }
      const productComponent = this.$refs.productModal
      this.$http[httpMethod](api, this.tempProduct)
        .then((res) => {
          console.log(res.data)
          productComponent.hideModal()
          this.getProduct()
        }).catch((err) => {
          console.log(err)
        })
    },
    delProduct (item) {
      this.tempProduct = item
      console.log(this.tempProduct)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      const productDelComponent = this.$refs.delModal
      this.$http.delete(api, this.tempProduct)
        .then((res) => {
          console.log(res.data)
          productDelComponent.hideModal()
          this.getProduct()
        }).catch((err) => {
          console.log(err)
        })
    }

  },
  created () {
    this.getProduct()
  }
}
</script>
