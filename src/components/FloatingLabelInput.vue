<template>
    <div class="input-group">
      <input 
        	v-model="inputValue" 
          :type="type" 
          :id="id" 
          :placeholder="label"
          @input="updateValue" 
      />
      <label :for="id" class="fixed-label">{{ label }}</label>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps, defineEmits, watch } from 'vue';
  
  const props = defineProps<{
    value: string | number;
    label: string;
    type?: string;
    id: string;
    readonly: { type: Boolean, default: false },
  }>();
  
  const emit = defineEmits(['update:value']);
  const inputValue = ref(props.value);
  const isFocused = ref(false);
  
  watch(() => props.value, (newValue) => {
    inputValue.value = newValue;
  });
  
  const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:value', target.value);
  };
  </script>
  
  <style scoped>
  .input-group {
    position: relative;
    margin-bottom: 20px;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    padding-top: 30px; /* Espaço para o label fixo */
    padding-left: 30px; /* Margem à esquerda para o texto */
    font-size: 16px;
    border: 2px solid #3366cc;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
  }

  .input-group input::placeholder {
  color: #ccc; /* Tom mais claro para o placeholder */
}
  
  .fixed-label {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 13px;
    color: #666666;
    background: white;
    padding: 0 5px;
  }

  </style>
  