<template>
  <div class="product-modal" v-if="showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ selectedProduct.prodName }}</h2>
      <p>Category: {{ selectedProduct.category }}</p>
      <p>Price: R{{ selectedProduct.amount }}</p>
      <!-- Add more product details here if needed -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedProduct: Object, // The product to display in the modal
    showModal: Boolean, // Controls whether the modal is shown or hidden
  },
  methods: {
    closeModal() {
      this.$emit("close"); // Emit an event to close the modal
    },
  },
};
</script>

<style scoped>
/* Your modal styling goes here */
</style>
