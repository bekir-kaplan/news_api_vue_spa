<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';

export interface IEventMultiSelectChange {
  key: string;
  values: string[];
  event?: Event;
}

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

// Select an option
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

// Remove selected option
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
  <div class="relative w-full" ref="dropdownRef">
    <!-- Label -->
    <label v-if="label" :for="id || name" class="block text-gray-700 mb-1">{{ label }}</label>

    <!-- Selected Items -->
    <div
      class="relative w-full border rounded-lg bg-white p-2 cursor-pointer"
      @click="toggleDropdown"
    >
      <div class="flex flex-wrap gap-2">
        <span v-if="!selectedOptions.length" class="text-gray-400">{{
          placeholder || 'Select options...'
        }}</span>

        <div
          v-for="option in selectedOptions"
          :key="option"
          class="flex items-center bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
        >
          {{
            props.map
              ? props.options.find((o: any) => o[props.map?.key || ''] === option)?.[
                  props.map.value
                ]
              : option
          }}
          <button @click.stop="(e) => removeOption(e, option)" class="ml-1 text-white">✕</button>
        </div>
      </div>
      <ChevronDownIcon class="absolute right-2 top-2 w-5 h-5 text-gray-500" />
    </div>

    <!-- Dropdown -->
    <div v-if="isOpen" class="absolute z-10 w-full bg-white border mt-1 shadow-lg rounded-lg p-2">
      <input
        v-if="searchable"
        v-model="searchQuery"
        type="text"
        class="w-full p-2 border-b focus:outline-none"
        placeholder="Search..."
      />
      <ul class="max-h-60 overflow-y-auto">
        <li
          v-for="option in filteredOptions"
          :key="props.map ? option[props.map.key] : option.key"
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
/* @import '@/styles/form-elements/form-multiselect.css'; */
</style>
