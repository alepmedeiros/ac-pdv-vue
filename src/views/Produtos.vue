<template>
  <div class="produtos-container">
    <h1>Cadastro de Produtos</h1>
    <form @submit.prevent="submitProduto">
      <div class="input-group">
        <label for="productName">Nome do Produto</label>
        <input v-model="productName" id="productName" type="text" placeholder="Nome do produto" required />
      </div>
      <div class="input-group">
        <label for="price">Preço</label>
        <input v-model="price" id="price" type="number" placeholder="Preço" required />
      </div>
      <button type="submit">Cadastrar Produto</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const productName = ref('');
const price = ref<number | null>(null);

const submitProduto = () => {
  console.log('Produto Cadastrado:', { productName: productName.value, price: price.value });
};
</script>

<style scoped>
.produtos-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
