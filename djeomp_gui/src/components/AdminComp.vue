<template>
    <div>
        <tr class="table-row">
            <th class="table-head">{{ product.prodID }}</th>
            <td>{{ product.prodName }}</td>
        
            <td><img :src="product.image" alt="" class="prodImg" /></td>
            <td>
          
            </td>
            <td>{{ product.price }}</td>
            <td>{{ product.category }}</td>
            <td class="second-table-data">
              <div class="action">
                <button class="btn-edit">
                  <router-link :to="{ name: 'admin edit', params: { id: Product.productID } }">
                    Edit
                  </router-link>
                </button>
                <button class="btn-delete" @click="deleteProduct(Product.productID)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ["product"],
  methods: {
    async deleteProduct(id) {
      try {
        await axios.delete(`https://dj-eomp.onrender.com/product/${id}`);
        await this.$store.dispatch("fetchProducts");
      } catch (err) {
        alert(err);
      }
    },
  },
};
</script>

<style scoped>

</style>