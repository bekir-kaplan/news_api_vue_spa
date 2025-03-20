<!--
  SelectElement.vue
  --------------------
  This component provides a customizable select (dropdown) input field.
  It allows dynamic mapping of options and supports two-way binding with `v-model`.

  Props:
    - id (string, optional): The ID attribute for the select element.
    - name (string, optional): The name attribute for the select element.
    - label (string, optional): The label text displayed above the select field.
    - map ({ key: string | number; value: string }, optional): Defines the keys used in the 
    options array.
    - options (any | { [key: string | number]: string }[]): An array of selectable options.
    - defaultValue (string | number, optional): The default selected value.
    - modelValue (string | number, optional): The selected value for v-model support.

  Emits:
    - update:value: Emitted when the selected value changes.
    - update:modelValue: Emitted when using `v-model` for two-way binding.

  Dependencies:
    - Heroicons:
      - ChevronDownIcon: Provides a dropdown arrow icon.
    - Vue:
      - `defineProps`: Defines the component props.
      - `defineEmits`: Defines event emitters.

  Methods:
    - handleChange(key: string, event: Event): Emits the selected value when the dropdown changes.
    - checkIfSelected(value: string): Checks if an option should be marked as selected.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`select-element.css`) for styling.
-->
<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  id?: string;
  name?: string;
  label?: string;
  map?: { key: string | number; value: string };
  options: any | { [key: string | number]: string }[];
  defaultValue?: string | number;
  modelValue?: string | number;
}>();

const emit = defineEmits(['update:value', 'update:modelValue']);

/**
 * Handles changes to the select input.
 * Emits the selected value and updates modelValue if applicable.
 * @param key - The key associated with the selected option
 * @param event - The event object from the select change event
 */
const handleChange = (key: string, event: Event): void => {
  const target = event.target as HTMLSelectElement;
  emit('update:value', { key, value: target.value, event });
  if (props.modelValue) {
    emit('update:modelValue', target.value);
  }
};

/**
 * Checks if a given value matches the default selected value.
 * @param key - The key to check
 * @returns {boolean} - True if the key matches the defaultValue, otherwise false
 */
const checkIfSelected = (key: string | number): boolean => {
  if (!props.defaultValue) {
    return false;
  }
  return props.defaultValue === key;
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
        @change="(e) => handleChange(name || 'unknown', e)"
      >
        <option
          v-if="defaultValue"
          :key="defaultValue"
          :value="defaultValue"
          :selected="checkIfSelected(defaultValue)"
        >
          {{ defaultValue }}
        </option>
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
