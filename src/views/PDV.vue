<template>
  <div class="pos-container">
    <ProductDisplay :productName="currentProductName" />

    <div class="pos-content">
      <div class="product-input">
        <FloatingLabelInput
          v-model="productCode"
          label="Código"
          type="text"
          id="productCode"
        />

        <div class="product-input-container">
          <div class="left-section">
            <ImageUploadInput
              id="productImage"
              placeholder="SEM IMAGEM"
            />
          </div>

          <div class="right-section">
            <FloatingLabelInput
              v-model="quantity"
              label="Quantidade"
              type="number"
              id="quantity"
            />
            <FloatingLabelInput
              v-model="value"
              label="Unitário"
              type="number"
              id="value"
              readonly
              
            />
            <FloatingLabelInput
              v-model="total"
              label="Total"
              type="text"
              id="total"
              readonly
            />
          </div>
        </div>

        <div class="actions">
          <ActionButton buttonClass="cancel" @click="cancelarVenda">CANCELAR</ActionButton>
          <ActionButton buttonClass="clear" @click="limpaItens">LIMPAR TUDO</ActionButton>
          <ActionButton buttonClass="print" @click="imprimirCupom">IMPRIMIR</ActionButton>
          <ActionButton buttonClass="pay" @click="finalizarVenda">PAGAR</ActionButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProductDisplay from '@/components/ProductDisplay.vue';
import FloatingLabelInput from '@/components/FloatingLabelInput.vue';
import ImageUploadInput from '@/components/ImageUploadInput.vue';
import ActionButton from '@/components/ActionButton.vue';

const currentProductName = ref(''); // Nome inicial do produto

// Função para atualizar o nome do produto
function updateProductName(newName: string) {
  currentProductName.value = newName;
}

// Exemplo: Chame essa função ao buscar os dados do produto da API
updateProductName('Novo Produto');


const cancelarVenda = () => {
  //cancela a venda
};

const limpaItens = () => {
  //limpa os itens da tela
}

const imprimirCupom = () => {
  //fecha a venda e imprime o cupom
}

const finalizarVenda = () => {
  //finaliza e visualiza o cupom gerado
}
</script>

<style scoped>
.pos-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 100px 100px; /* Ajuste o padding top para 60px para compensar a navbar fixa */
}
.product-input-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%; /* Ocupa a altura total */
  flex-wrap: wrap; /* Para responsividade */
}

.product-input {
  display: flex;
  flex-direction: column;
  width: 48%;
  background-color: #3366cc;
  padding: 20px;
  border-radius: 10px;
  margin-right: 10px;
}

.pos-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top : 20px;
}

.left-section, .right-section {
  width: 48%;
  height: 92.3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.actions {
  display: flex;
  justify-content: space-between; /* Alinha os botões dentro do container */
  width: 100%;
  background-color: white; /* Define o fundo branco */
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px; /* Espaçamento superior de 20px */
  box-sizing: border-box; /* Para incluir padding na largura */
  flex-wrap: wrap; /* Para garantir que os botões se ajustem em telas menores */
}
</style>