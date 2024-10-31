<template>
  <div class="product-container">
    <div class="header">
      <button class="back-button" @click="goBack">← VOLTAR</button>
      <h2>CADASTRAR NOVO PRODUTO</h2>
    </div>
    <form @submit.prevent="submitForm" class="product-form">
      <section>
        <h3>Produto</h3>
        <div class="product-details">
          <div class="product-image-upload">
            <div class="image-preview" @click="triggerFileInput">
              <img :src="productImage || semProdutoImg" alt="Produto" />
            </div>
            <input id="file-input" type="file" @change="handleImageUpload" ref="fileInput" />
          </div>
          <div class="product-info">
            <FormRow>
              <FormInput 
                label="Título do produto" 
                v-model="formData.titulo" 
                sizeClass="col-md-8" 
                required 
              />
            </FormRow>
            <FormRow>
              <SelectAsync
                label="Unidade"
                apiEndpoint="/api/unidades"
                v-model="formData.unidade.id"
                selectId="unidade-select"
                sizeClass="col-md-4"
              />
              <SelectAsync
                label="Marca"
                apiEndpoint="/api/marcas"
                v-model="formData.marca.id"
                selectId="marca-select"
                sizeClass="col-md-4"
              />
            </FormRow>
          </div>
        </div>
      </section>

      <section>
        <h3>Dados Complementares</h3>
        <FormRow>
          <FormInput label="Código" v-model="formData.codigo" sizeClass="col-md-2" />
          <FormInput label="Descrição PDV" v-model="formData.descricaoPDV" sizeClass="col-md-8" />
          <FormInput label="EAN/GTIN" v-model="formData.gtin" sizeClass="col-md-4" />
          <FormInput label="NCM" v-model="formData.ncm" sizeClass="col-md-2" />
        </FormRow>
        <FormRow>
          <SelectAsync
            label="Inativo"
            v-model="formData.inativo"
            selectId="inativo-select"
            :staticOptions="[{ id: 'S', label: 'Sim' }, { id: 'N', label: 'Não' }]"
            :useStatic="true"
            sizeClass="col-md-2"
          />
          <SelectAsync
            label="Arrendar"
            v-model="formData.marca.id"
            selectId="iat-select"
            :staticOptions="[{ id: 'S', label: 'Sim' }, { id: 'N', label: 'Não' }]"
            :useStatic="true"
            sizeClass="col-md-2"
          />
          <FormInput label="IBPT" v-model="formData.ibpt" sizeClass="col-md-2" />
          <SelectAsync
            label="Sped"
            v-model="formData.itemSped"
            selectId="sped-select"
            :staticOptions="[{ id: 'S', label: 'Sim' }, { id: 'N', label: 'Não' }]"
            :useStatic="true"
            sizeClass="col-md-2"
          />
        </FormRow>
      </section>

      <section>
        <h3>Tabela de Preços</h3>
        <FormRow>
          <FormInput 
            label="Valor de Compra"  
            v-model="formData.valorCompra"
            isMoney
            :moneyConfig="{ prefix: 'R$ ', thousands: '.', decimal: ',', precision: 2 }"
            sizeClass="col-md-2" 
          />
          <FormInput 
            label="Valor Venda" 
            v-model="formData.valorVenda" 
            sizeClass="col-md-2" 
            type="number"
          />
          <FormInput 
            label="Venda Minima" 
            v-model="formData.precoVendaMinimo" 
            sizeClass="col-md-2" 
            type="number"
          />
          <FormInput 
            label="Lucro Minimo" 
            v-model="formData.precoLocroMinimo" 
            sizeClass="col-md-2" 
            type="number"
          />
          <FormInput 
            label="Lucro Máximo" 
            v-model="formData.precoLucroMaximo" 
            sizeClass="col-md-2" 
            type="number"
          />
          <FormInput 
            label="Lucro Zero" 
            v-model="formData.precoLucroZero" 
            sizeClass="col-md-2" 
            type="text"
          />
        </FormRow>
      </section>

      <section>
          <h3>Estoque</h3>
          <FormRow>
            <FormInput 
              label="Estoque Atual" 
              v-model="formData.quantidadeEstoque" 
              sizeClass="col-md-2" 
              type="number"
            />
            <FormInput 
              label="Estoque Anterior" 
              v-model="formData.quantidadeEstoqueAnterior" 
              sizeClass="col-md-2" 
              type="number"
              readonly
            />
            <FormInput 
              label="Estoque Minimo" 
              v-model="formData.estoqueMinimo" 
              sizeClass="col-md-2" 
              type="number"
            />
            <FormInput 
              label="Estoque Máximo" 
              v-model="formData.estoqueMaximo" 
              sizeClass="col-md-2" 
              type="number"
            />
            <FormInput 
              label="Estoque Ideal" 
              v-model="formData.estoqueIdeal" 
              sizeClass="col-md-2" 
              type="number"
            />
        </FormRow>
      </section>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '@/components/FormInput.vue';
import SelectAsync from '@/components/SelectAsync.vue';
import semProdutoImg from '@/assets/semproduto.jpeg';
import FormRow from '@/components/FormRow.vue';

const router = useRouter();
const productImage = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

interface Unidade {
  id: string;
  sigla: string;
}

interface Marca {
  id: string;
  nome: string;
}

interface Empresa {
  id: string;
}

interface FormData {
  id: string;
  empresa: Empresa,
  unidade: Unidade;
  marca: Marca;
  gtin: string;
  codigo: string;
  ncm: string;
  nome: string;
  descricao: string;
  descricaoPDV: string;
  valorCompra: number;
  valorVenda: number;
  precoVendaMinimo: number;
  precoLucroZero: number;
  precoLocroMinimo: number;
  precoLucroMaximo: number;
  quantidadeEstoque: number;
  quantidadeEstoqueAnterior: number;
  estoqueMinimo: number;
  estoqueMaximo: number;
  estoqueIdeal: number;
  excluido: string;
  inativo: string;
  foto: string;
  iat: string;
  ibpt: string;
  itemSped: string;
}

const formData = ref<FormData>({
  id: '',
  empresa: { id: '' },
  unidade: { id: '', sigla: '' },
  marca: { id: '', nome: '' },
  gtin: '',
  codigo: '',
  ncm: '',
  nome: '',
  descricao: '',
  descricaoPDV: '',
  valorCompra: 0,
  valorVenda: 0,
  precoVendaMinimo: 0,
  precoLucroZero: 0,
  precoLocroMinimo: 0,
  precoLucroMaximo: 0,
  quantidadeEstoque: 0,
  quantidadeEstoqueAnterior: 0,
  estoqueMinimo: 0,
  estoqueMaximo: 0,
  estoqueIdeal: 0,
  excluido: '',
  inativo: '',
  foto: '',
  iat: '',
  ibpt: '',
  itemSped: '',
});

const goBack = () => {
  router.back();
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target) {
        productImage.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
.product-container {
  padding: 20px;
  background-color: #f4f4f9;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #a049b8;
  padding: 10px;
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.back-button {
  background-color: #fff;
  color: #a049b8;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
}

h2 {
  margin: 0;
}

.product-form {
  background-color: #fff;
  padding: 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.product-image-upload {
  width: 200px;
}

.image-preview {
  width: 200px;
  height: 200px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #ccc;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#file-input {
  display: none;
}

.product-info {
  flex: 1;
  margin-left: 20px;
}

.form-actions {
  margin-top: 20px;
  text-align: right;
}

.submit-button {
  background-color: #3a82f7;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

h3 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 25px;
  color: #5c6e74;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}
</style>
