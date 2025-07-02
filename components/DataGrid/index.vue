<template>
  <DataGridFilterSearch v-model="filter" :headers="props.headers" :apply="fetchData" :search-fields="props.searchFields"
    v-if="useFilterSearch"></DataGridFilterSearch>

  <EasyDataTable :items="items" :headers="props.headers" :loading="loading" :server-items-length="metadata.total"
    v-model:server-options="serverOptions" theme-color="#212631" table-class-name="custom-table"
    rows-per-page-message="Baris Perhalaman" rows-of-page-separator-message="dari" :rows-items="[10, 25, 50]"
    :show-index="props.showIndex" :prevent-context-menu-row="false" class="">
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData"></slot>
    </template>
  </EasyDataTable>
</template>
<script setup lang="ts">
import EasyDataTable, {
  type Item,
  type ServerOptions,
} from "vue3-easy-data-table";
import type { FilterData, Header } from "./types";
import type { NitroFetchRequest, NitroFetchOptions } from "nitropack";
import { defu } from "defu";
import Swal from "sweetalert2";

const props = withDefaults(
  defineProps<{
    searchFields?: { [key: string]: string };
    headers: Header[];
    showIndex: Boolean;
    sortBy?: string;
    sortType?: "asc" | "desc";
    fetch: {
      request: NitroFetchRequest;
      opts?: NitroFetchOptions<NitroFetchRequest>;
    };
    useFilterSearch?: boolean;
  }>(),
  {
    useFilterSearch: true,
  }
);
const filter: Ref<FilterData> = ref({ filter: [] });
const items: Ref<Item[]> = ref([]);
const loading = ref(false);
const metadata: Ref<{ total: number }> = ref({ total: 0 });
const serverOptions = ref<ServerOptions>({
  page: 1,
  rowsPerPage: 10,
  sortBy: props.sortBy,
  sortType: props.sortType,
});
const fieldOptions: ComputedRef<{ [key: string]: any }> = computed(() => {
  if (props.searchFields) return props.searchFields;
  return props.headers.reduce((value, row) => {
    if (row.searchable === true || typeof row.searchable === "undefined")
      return { ...value, ...{ [row.value]: row.text } };
    return value;
  }, {});
});

const fetchData = async (resetPage?: boolean) => {
  loading.value = true;
  if (resetPage === true) {
    serverOptions.value.page = 1;
  }
  const searchQuery = filter.value?.search
    ? Object.keys(fieldOptions.value).map((field: string): any => {
      return { [field]: { contain: filter.value?.search } };
    })
    : {};
  const options = defu(
    props.fetch.opts,
    { query: { where: filter.value.filter } },
    { query: serverOptions.value },
    { query: { search: searchQuery } }
  );
  try {
    const response: any = await $fetch(props.fetch.request, options);
    items.value = response.rows;
    metadata.value.total = response.metadata.total;
  } catch (err: any) {
    Swal.fire("Information", err.data.message, "info");
  }
  loading.value = false;
};

watch(
  serverOptions,
  () => {
    fetchData();
  },
  { deep: true }
);

defineExpose({
  fetchData,
});

fetchData();
</script>
<style lang="scss">
@import "vue3-easy-data-table/dist/style.css";

.custom-table {
  --easy-table-header-font-size: --cui-body-font-size;
  --easy-table-message-font-size: 16px;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-height: 40px;
  --easy-table-body-row-font-size: 1rem;
  --easy-table-body-row-height: 50px;
}
</style>
