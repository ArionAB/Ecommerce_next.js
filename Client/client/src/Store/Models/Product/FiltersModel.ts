import { ProductSizesModel } from "./ProductSizesModel";

export interface FiltersModel {
  PageNumber: string | string[];
  PageSize: string | string[];
  ProductSize?: string[] | any;
  SearchText: string | string[];
  MinPrice: string | string[];
  MaxPrice: string | string[];
  ProductCategory: string | string[];
  SubcategoryType: string | string[];
}
