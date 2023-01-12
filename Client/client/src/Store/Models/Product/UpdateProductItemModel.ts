import { FruitType } from "../../Enums/Product/FruitType";
import { productCategoryType } from "../../Enums/Product/productCategory";

export interface UpdateProductItemModel {
  productId: string;
  price: string;
  description: string;
  title: string;
  productCategory: productCategoryType;
  fruitType: FruitType;
  newAdditionalPictures: File[];
}
