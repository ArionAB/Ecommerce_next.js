import { DataGridColumnNames } from "../../Enums/DataGridColumnNames";
import { StatusType } from "../../Enums/Order/StatusType";

export interface OrderFiltersModel {
  pageNumber: number;
  orderToSortBy: DataGridColumnNames;
  sortingOrder: boolean;
  searchText?: string;
  firstEntryDate?: string | undefined;
  secondEntryDate?: string | undefined;
  status?: StatusType;
}
