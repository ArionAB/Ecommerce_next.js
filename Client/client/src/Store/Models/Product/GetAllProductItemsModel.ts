import { ProductItemModel } from "./ProductItem";
import { BabyItemsCategoryModel } from "./BabyItemsCategoryModel";
import { ProductSizesModel } from "./ProductSizesModel";

export interface GetAllProductItemsModel {
  productItems: ProductItemModel[];
  totalItemsPerCategory: BabyItemsCategoryModel;
  totalSizes: ProductSizesModel;
  priceRange: {
    minPrice: number;
    maxPrice: number;
  };
}
