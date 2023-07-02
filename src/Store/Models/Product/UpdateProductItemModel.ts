import { FruitType } from "../../Enums/Product/FruitType";
import { HoneyType } from "../../Enums/Product/HoneyType";

export interface UpdateProductItemModel {
  productId: string;
  priceKg: string;
  priceHalf: string;
  description: string;
  title: string;
  productCategory: HoneyType;
  fruitType: FruitType;
  newAdditionalPictures: File[];
  inStock: boolean;
}
