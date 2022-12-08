import { ProductSizesModel } from "./ProductSizesModel";

export interface FiltersModel {
  PageNumber: number;
  PageSize: number;
  ProductSize: string[];
  SearchText: string;
  MinPrice: number;
  MaxPrice: number;
  ProductCategory: number;
  SubcategoryType: number;
}
