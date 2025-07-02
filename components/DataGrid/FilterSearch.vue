<template>
  <div class="fixed inset-0 flex z-50 items-center justify-center bg-black" ref="modalFilter" v-if="showAdvencedFilter">
    <div class="rounded-lg shadow-lg w-full max-w-md" v-if="showAdvencedFilter" style="background-color: azure;">
      <div class="border-b p-4">
        <h3 class="text-lg font-semibold">Filter dan Pencarian</h3>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Kolumn</label>
          <select class="w-full mt-1 p-2 border rounded-md" @change="checkItems" v-model="currentFilter.field">
            <option value="">-- Pilih Kolumn --</option>
            <template v-for="(label, field) in fieldOptions">
              <option :value="field">
                {{ typeof label === "string" ? label : label.label }}
              </option>
            </template>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Operator</label>
          <select class="w-full mt-1 p-2 border rounded-md" v-model="currentFilter.operator"
            :class="{ 'border-red-500': invalid.operator }">
            <option value="" :disabled="itemsSelection">-- Pilih Operator --</option>
            <option v-for="(label, value) in operatorOptions" :value="value"
              :disabled="itemsSelection && value != 'eq'">
              {{ label }}
            </option>
          </select>
          <p v-if="invalid.operator" class="text-red-500 text-sm">Operator harap dipilih</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Nilai</label>
          <select v-if="itemsSelection" v-model="currentFilter.value" :class="{ 'border-red-500': invalid.value }"
            class="w-full mt-1 p-2 border rounded-md">
            <option value="">-- Pilih --</option>
            <option v-for="(label, value) in itemsSelection" :value="value">{{ label }}</option>
          </select>
          <input v-else type="text" v-model="currentFilter.value" :class="{ 'border-red-500': invalid.value }"
            class="w-full mt-1 p-2 border rounded-md" />
          <p v-if="invalid.value" class="text-red-500 text-sm">Isian tidak boleh kosong</p>
        </div>
      </div>
      <div class="border-t p-4 flex justify-end space-x-2">
        <button @click="toggleShowAdvencedFilter" class="px-4 py-2 bg-gray-500 text-white rounded-md">Tutup</button>
        <button @click="addFilter" class="px-4 py-2 bg-blue-500 text-white rounded-md">Tambahkan</button>
      </div>
    </div>
  </div>

  <div class="flex flex-wrap gap-4 mt-4">
    <div class="w-full md:w-1/2">
      <div class="flex items-center border rounded-md p-1">
        <Input type="text" class="flex-1 rounded-r-none border-none mr-2" placeholder="Pencarian" @keyup.enter="props.apply(true)"
          v-model="model.search" />
        <Button @click="props.apply(true)" variant="outline" class="px-4 rounded-none border-none cursor-pointer">
          <Search />
        </Button>
        <Button @click="toggleShowAdvencedFilter" variant="outline" class="px-4 rounded-l-none border-none cursor-pointer">
          <Filter />
        </Button>
      </div>
    </div>
    <div class="w-full md:w-1/2 flex flex-wrap gap-2">
      <div v-for="([key, [operator, value]], index) in filterInEntries" :key="index"
        class="flex items-center space-x-2">
        <button class="px-4 py-2 bg-gray-200 rounded-md" @click="modifyFilter(key, operator, value, index)">
          {{ fieldOptions[key] }} {{ operatorOptions[operator] }} {{ itemsHeader[key]?.[value] ?? value }}
        </button>
        <button @click="deleterFilter(index)" class="px-2 py-1 bg-red-500 text-white rounded-md">X</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModelRef } from "vue";
import type { FilterData, Header } from "./types";
// import type { Modal } from "bootstrap";
// import CIcon from "@coreui/icons-vue";
import { Search, Filter } from "lucide-vue-next"

const { $bs } = useNuxtApp();

const showAdvencedFilter = ref(false);
const toggleShowAdvencedFilter = () => {
  showAdvencedFilter.value = !showAdvencedFilter.value;
}

const props = defineProps<{
  searchFields?: { [key: string]: string };
  apply: Function;
  headers: Header[];
}>();
const operatorOptions: { [key: string]: string } = {
  eq: "=",
  ne: "!=",
  gt: ">",
  gte: ">=",
  lt: "<",
  lte: "=<",
  contain: "Berisi",
};
const invalid: Ref<{ [key: string]: boolean }> = ref({
  field: false,
  operator: false,
  value: false,
});

const currentFilter: Ref<{
  index?: number;
  field: string;
  operator: string;
  value: string;
}> = ref({
  index: undefined,
  field: "",
  operator: "",
  value: "",
});

const modalFilter: Ref<HTMLDivElement | undefined> = ref();
let modal: Modal;

onMounted(() => {
  // modal = new $bs.Modal(modalFilter.value!, {
  //   backdrop: "static",
  //   keyboard: false,
  // });
});

const model: ModelRef<FilterData> = defineModel({ default: { filter: [] } });
const itemsSelection = ref();

const fieldOptions: ComputedRef<{ [key: string]: any }> = computed(() => {
  if (props.searchFields) return props.searchFields;
  return props.headers.reduce((value, row) => {
    if (row.searchable === true || typeof row.searchable === "undefined")
      return { ...value, ...{ [row.value]: row.text } };
    return value;
  }, {});
});

const itemsHeader: Ref<{ [key: string]: any }> = computed(() =>
  props.headers.reduce((value, row) => {
    return { ...value, [row.value]: row.items };
  }, {})
);
const filterInEntries = computed(() => {
  return model.value.filter.map((value) => {
    const entry = Object.entries(value).at(0);
    if (entry && entry?.length > 1) {
      return [entry[0], Object.entries(entry[1]).at(0)];
    }
  }) as [string, [string, any]];
});
const checkItems = () => {
  nextTick(() => {
    const head = props.headers.find(
      (row) => row.value === currentFilter.value.field
    );
    if (head?.items) {
      itemsSelection.value = head.items;
      currentFilter.value.operator = "eq";
    } else {
      itemsSelection.value = undefined;
    }
  });
};
const modifyFilter = (key: any, operator: any, value: any, index?: number) => {
  toggleModal();

  currentFilter.value = {
    index: index,
    field: key,
    operator: operator,
    value: value,
  };
  if (key) {
    checkItems();
  }
};
const addFilter = () => {
  let isAllValid = true;
  Object.entries(currentFilter.value).forEach(
    ([key, value]: [string, string | number]) => {
      if (key !== "index") {
        invalid.value[key] = !value;
        isAllValid = isAllValid && !!value;
      }
    }
  );
  if (isAllValid) {
    const filter = {
      [currentFilter.value.field]: {
        [currentFilter.value.operator]: currentFilter.value.value,
      },
    };
    if (typeof currentFilter.value.index !== "undefined") {
      model.value.filter[currentFilter.value.index] = filter;
    } else {
      model.value.filter.push(filter);
    }
    props.apply(true);
    toggleModal();
  }
};
const deleterFilter = (index: number) => {
  model.value.filter.splice(index, 1);
  props.apply(true);
};
const toggleModal = () => {
  currentFilter.value = { field: "", operator: "", value: "" };
  modal.toggle();
};
</script>
