<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';

export interface IEventSelectElementChange {
  key: string;
  value: string;
  event?: Event;
}

const props = defineProps<{
  id?: string;
  name: string;
  label?: string;
  map?: { key: string | number; value: string };
  options: any | { [key: string | number]: string }[];
  defaultValue?: string | number;
}>();

const emit = defineEmits(['update:value']);

const handleChange = (key: string, event: Event): void => {
  const target = event.target as HTMLSelectElement;
  emit('update:value', { key, value: target.value, event });
};

const checkIfSelected = (value: string): boolean => {
  if (!props.defaultValue) {
    return false;
  }
  return props.defaultValue === value;
};
</script>

<template>
  <div class="select-element-container">
    <label v-if="label" :for="id || name" class="select-element-label">{{ label }}</label>
    <div class="select-element-wrapper">
      <select
        :id="id || name"
        :name="name"
        class="select-element"
        :value="defaultValue"
        @change="(e) => handleChange(name, e)"
      >
        <option
          v-for="option in options"
          :key="map ? option[map.key] : option.key"
          :value="map ? option[map.key] : option.key"
          :selected="checkIfSelected(map ? option[map.key] : option.key)"
        >
          {{ map ? option[map.value] : option.value }}
        </option>
      </select>
      <ChevronDownIcon class="select-element-icon" />
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/form-elements/select-element.css';
</style>
