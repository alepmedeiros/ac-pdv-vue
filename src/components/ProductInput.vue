<template>
    <div class="product-input">
        <FloatingLabelInput
          v-model="productCode"
          label="Código"
          type="text"
          id="productCode"
          @keydown.enter="emitBuscarProduto"
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
              :isDecimal="true"
              @input="calcularTotal"
            />
            <FloatingLabelInput
              v-model="unitario"
              label="Unitário"
              type="number"
              id="unitario"   
              :disabled="true" 
              :isCurrency="true"          
            />
            <FloatingLabelInput
              v-model="total"
              label="Total"
              type="text"
              id="total"
              :disabled="true"
              :isCurrency="true"
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
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import FloatingLabelInput from './FloatingLabelInput.vue';
import ImageUploadInput from './ImageUploadInput.vue';
import ActionButton from './ActionButton.vue';

// Define as propriedades que o componente receberá
const props = defineProps<{
  productCode?: string;
  quantity?: number;
  unitario?: number;
  total?: number;
}>();

// Define os eventos que o componente emitirá
const emit = defineEmits<{
  (e: 'cancelarVenda'): void;
  (e: 'limpaItens'): void;
  (e: 'imprimirCupom'): void;
  (e: 'finalizarVenda'): void;
  (e: 'buscarProduto', codigo: string): void;
}>();

// Define os valores para v-model
const productCode = ref(props.productCode || '');
const quantity = ref(props.quantity || 1);
const unitario = ref(props.unitario || 0);
const total = ref(props.total || 0);

// Watchers para atualizar os valores reativamente sempre que as props mudarem
watch(() => props.quantity, (newQuantity) => {
  quantity.value = newQuantity ?? 1;
  calcularTotal();
});

watch(
  () => props.unitario, 
  (newValue) => {
    unitario.value = newValue ?? 0;
  calcularTotal();
  }
);

watch(() => props.total, (newTotal) => {
  total.value = newTotal ?? 0;
});


// Função para emitir o evento de busca de produto
const emitBuscarProduto = () => {
  emit('buscarProduto', productCode.value);
};

// Funções de manipulação de eventos
const calcularTotal = () => {
  total.value = unitario.value * quantity.value;
};

// Funções de manipulação de eventos
const cancelarVenda = () => emit('cancelarVenda');
const limpaItens = () => emit('limpaItens');
const imprimirCupom = () => emit('imprimirCupom');
const finalizarVenda = () => emit('finalizarVenda');
</script>

<style scoped>
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

.left-section, .right-section {
  width: 48%;
  height: 92.3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background-color: white; /* Define o fundo branco */
}

.actions button {
  padding: 8px 16px;
  font-size: 1rem;
  border-radius: 5px;
  flex: 1;
  margin: 0 5px;
  max-width: calc(25% - 10px);
}

@media (max-width: 768px) {
  .actions button {
    padding: 6px 12px;
    font-size: 0.875rem;
  }
}

@media (max-width: 576px) {
  .actions button {
    padding: 4px 8px;
    font-size: 0.75rem;
  }
}
</style>