import { FruitType } from "../../Enums/Product/FruitType";
import { HoneyType } from "../../Enums/Product/HoneyType";
import { SizeType } from "../../Enums/SizeType";
import { ProductPictureModel } from "./ProductPicture";

export interface ProductItemModel {
  cartProductId: string;
  productId: string;
  productPictures: ProductPictureModel[];
  priceKg: string;
  priceHalf: string;
  description: string;
  title: string;
  productCategory: HoneyType;
  fruitType: string;
  totalCategoryItems: string;
  sizeType: SizeType;
  quantity: number | string;
  mixedFruitId: FruitType[];
}
