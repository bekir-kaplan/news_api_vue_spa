<script setup lang="ts">
/**
 * Multi-Select Dropdown Component
 * ---------------------------------------------------
 * This component allows users to select multiple options from a dropdown list.
 *
 * Features:
 * - Supports searching within options.
 * - Allows a configurable max selection limit.
 * - Provides a clear UI with selected items displayed as tags.
 * - Emits updated values for parent components.
 *
 * Props:
 * - `id` (optional) - The unique identifier for the select element.
 * - `name` (required) - The name of the selection.
 * - `label` (optional) - Label text displayed above the dropdown.
 * - `map` (optional) - Defines the key-value mapping for options.
 * - `options` (required) - List of selectable options.
 * - `defaultValue` (optional) - Pre-selected options on load.
 * - `modelValue` (optional) - Bound value for v-model usage.
 * - `searchable` (optional) - Enables search functionality.
 * - `maxSelections` (optional) - Limits the number of selected options.
 * - `placeholder` (optional) - Text displayed when no option is selected.
 */
import { ref, computed, onMounted } from 'vue';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  id?: string;
  name: string;
  label?: string;
  map?: { key: string | number; value: string };
  options: any | { [key: string | number]: string }[];
  defaultValue?: string[];
  modelValue?: string[];
  searchable?: boolean;
  maxSelections?: number;
  placeholder?: string;
}>();

const emit = defineEmits(['update:value', 'update:modelValue']);

const isOpen = ref(false);
const searchQuery = ref('');
const selectedOptions = ref<string[]>(props.defaultValue || []);
const dropdownRef = ref<HTMLElement | null>(null);

// Computed: Filter options based on search
const filteredOptions = computed(() =>
  props.options.filter((option: any) =>
    (props.map ? option[props.map.value] : option.value)
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
);

// Handle click outside to close dropdown
onMounted(() => {
  document.addEventListener('click', (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isOpen.value = false;
    }
  });
});

// Toggle dropdown visibility
const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value;
};

/**
 * Handles option selection.
 * - Prevents duplicate selections.
 * - Limits selection based on `maxSelections` (if defined).
 * - Emits updated values to the parent component.
 *
 * @param {Event} event - The event triggered by clicking an option.
 * @param {any} option - The selected option object.
 */
const selectOption = (event: Event, option: any): void => {
  const value = props.map ? option[props.map.key] : option.key;

  if (!selectedOptions.value.includes(value)) {
    if (!props.maxSelections || selectedOptions.value.length < props.maxSelections) {
      selectedOptions.value.push(value);
      const filterData = Object.values(selectedOptions.value).join(',');
      emit('update:value', { key: props.name, value: filterData, event });
      if (props.modelValue) {
        emit('update:modelValue', selectedOptions.value);
      }
    }
  }
};

/**
 * Removes a selected option from the list.
 * - Updates the selected options state.
 * - Emits updated values to the parent component.
 *
 * @param {Event} event - The event triggered by clicking the remove button.
 * @param {string} value - The value of the option to be removed.
 */
const removeOption = (event: Event, value: string): void => {
  selectedOptions.value = selectedOptions.value.filter((v) => v !== value);
  const filterData = Object.values(selectedOptions.value).join(',');
  emit('update:value', { key: props.name, value: filterData, event });
  if (props.modelValue) {
    emit('update:modelValue', selectedOptions.value);
  }
};
</script>

<template>
  <div class="multi-select-container" ref="dropdownRef">
    <!-- Label -->
    <label v-if="label" :for="id || name" class="multi-select-label">{{ label }}</label>

    <!-- Selected Items -->
    <div class="multi-select-selected-items" @click="toggleDropdown">
      <div class="multi-select-selected-container">
        <span v-if="!selectedOptions.length" class="multi-select-placeholder">{{
          placeholder || 'Select options...'
        }}</span>

        <div v-for="option in selectedOptions" :key="option" class="multi-select-bedge">
          {{
            props.map
              ? props.options.find((o: any) => o[props.map?.key || ''] === option)?.[
                  props.map.value
                ]
              : option
          }}
          <button @click.stop="(e) => removeOption(e, option)">
            <XMarkIcon class="multi-select-bedge-close" />
          </button>
        </div>
      </div>
      <ChevronDownIcon class="multi-select-button-icon" />
    </div>

    <!-- Dropdown -->
    <div v-if="isOpen" class="multi-select-dropdown">
      <input
        v-if="searchable"
        v-model="searchQuery"
        type="text"
        class="multi-select-search-input"
        placeholder="Search..."
      />
      <ul class="multi-select-options">
        <li
          v-for="option in filteredOptions"
          :key="`${props.name}-${props.map ? option[props.map.key] : option.key}`"
          @click="(e) => selectOption(e, option)"
          class="p-2 hover:bg-gray-200 cursor-pointer"
        >
          {{ props.map ? option[props.map.value] : option.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/form-elements/form-multiselect.css';
</style>
