<template>
  <div class="input-group">
    <input 
      :value="formattedInputValue" 
      @input="updateValue" 
      :type="type" 
      :id="id" 
      :placeholder="label" 
      :readonly="disabled"
      :class="{ 'no-interaction': disabled, 'text-right': alignRight }"
    />
    <label :for="id" class="fixed-label">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
import { formatCurrency, formatDecimal } from '@/utils/utils';

const props = defineProps<{
  modelValue?: string | number;
  label: string;
  type?: string;
  id: string;
  disabled?: boolean; 
  isCurrency?: boolean;
  isDecimal?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

// Computed property to handle formatted display of the value
const formattedInputValue = computed({
  get() {
    if (props.isCurrency) {
      return formatCurrency(Number(props.modelValue));
    } else if (props.isDecimal) {
      return formatDecimal(Number(props.modelValue));
    }
    return props.modelValue;
  },
  set(value: string | number) {
    emit('update:modelValue', value);
  }
});

// Align text to the right if it's a currency or decimal field
const alignRight = computed(() => props.isCurrency || props.isDecimal);

// Handle input event, stripping non-numeric characters for controlled numeric fields
const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const rawValue = target.value.replace(/[^0-9.-]+/g, ""); // Remove non-numeric characters
  const value = Number(rawValue);
  emit('update:modelValue', value);
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
  padding-top: 30px;
  padding-left: 30px;
  font-size: 16px;
  border: 2px solid #3366cc;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
}

.input-group input.text-right {
  text-align: right;
}

.input-group input::placeholder {
  color: #ccc;
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

/* Style to disable interaction visually without changing appearance */
.no-interaction {
  pointer-events: none;
}
</style>
