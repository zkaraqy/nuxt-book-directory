import type { Header as HeaderEasy } from "vue3-easy-data-table";

export interface Header extends HeaderEasy {
  type?: "date" | "string" | "number";
  searchable?: boolean;
  items?: any;
}

export interface FilterData {
  search?: string;
  filter: Array<{
    [key: string]: {
      [key: string]: any;
    };
  }>;
}
