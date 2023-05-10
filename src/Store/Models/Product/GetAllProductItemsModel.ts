import { ProductItemModel } from "./ProductItem";

export interface GetAllProductItemsModel {
  productItems: ProductItemModel[];

  priceRange: {
    minPrice: number;
    maxPrice: number;
  };
  totalItems: number;
  totalSearchResultItems: number;
}
