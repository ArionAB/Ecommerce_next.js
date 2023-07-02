import { DataGridColumnNames } from "../../Enums/DataGridColumnNames";
import { OrderStatusType } from "../../Enums/Order/OrderStatusType";

export interface OrderFiltersModel {
  pageNumber: number;
  orderToSortBy: DataGridColumnNames;
  sortingOrder: boolean;
  searchText?: string;
  firstEntryDate?: string | undefined;
  secondEntryDate?: string | undefined;
  status?: OrderStatusType;
}
