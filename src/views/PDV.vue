<template>
  <div class="pos-container">
    <ProductDisplay :productName="currentProductName" />

    <div class="pos-content">
      <ProductInput
        :productCode="productCode"
        :quantity="quantity"
        :unitario="unitario"
        :total="total"
        @cancelarVenda="cancelarVenda"
        @limpaItens="limpaItens"
        @imprimirCupom="imprimirCupom"
        @finalizarVenda="finalizarVenda"
        @buscarProduto="buscarProduto"
      />
      
      <ProductList :items="items" @remove="removeItem" />

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ProductInput from '@/components/ProductInput.vue';
import ProductList from '@/components/ProductList.vue';
import ProductDisplay from '@/components/ProductDisplay.vue';
import { getProductByCode } from '@/service/productService';
import type { Item } from '@/types/items';

const productCode = ref<string>('');
const quantity = ref<number>(1);
const unitario = ref<number>(1);
const total = ref<number>(0);
const items = ref<Item[]>([]);
const currentProductName = ref(''); // Nome inicial do produto

const buscarProduto = async () => {
  try {
    const response = await getProductByCode(productCode.value);
    const produto = Array.isArray(response.data) ? response.data[0] : response.data; 
    currentProductName.value = produto.descricao;
    unitario.value = produto.valorVenda; // Define o valor unitário do produto
    total.value = unitario.value * quantity.value; // Calcula o total inicial   

    adicionarProduto(produto);
  } catch (error) {
    console.error('Erro ao buscar o produto:',error);
  }
}

// Função para adicionar o produto à lista de itens
const adicionarProduto = (produto: any) => {
  const item: Item = {
    description: produto.descricao,
    quantity: quantity.value,
    value: produto.valorVenda,
    total: produto.valorVenda * quantity.value,
  };

  items.value.push(item);
  atualizarTotais();
  resetInputs();
};


const resetInputs = () => {
  productCode.value = '';
  quantity.value = 1;
  unitario.value = 0;
};

// Função para atualizar os totais após adicionar um item
const atualizarTotais = () => {
  total.value = items.value.reduce((acc, item) => acc + item.total, 0);
};

// Defina as funções de manipulação para os eventos
const cancelarVenda = () => {
  console.log('Venda cancelada');
};

const limpaItens = () => {
  console.log('Itens limpos');
};

const imprimirCupom = () => {
  console.log('Impressão do cupom iniciada');
};

const finalizarVenda = () => {
  console.log('Venda finalizada');
};

const removeItem = (index: number) => {
  items.value.splice(index, 1);
  atualizarTotais();
};
</script>

<style scoped>
.pos-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 10px; /* Ajuste o padding top para 60px para compensar a navbar fixa */
}

.pos-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top : 20px;
}
</style>