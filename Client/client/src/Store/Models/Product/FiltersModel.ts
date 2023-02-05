export interface FiltersModel {
  PageNumber: number;
  PageSize: number;

  SearchText: string | string[];
  MinPrice: number;
  MaxPrice: number;
  ProductCategory: number;
  SubcategoryType: number;
}
