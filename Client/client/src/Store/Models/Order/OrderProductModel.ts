import { FruitType } from "../../Enums/Product/FruitType";
import { productCategoryType } from "../../Enums/Product/productCategory";
import { SizeType } from "../../Enums/SizeType";

export interface OrderProductModel {
  productId: string;
  title: string;
  price: number;
  sizeType: SizeType;
  fruitType: FruitType;
  productCategory: productCategoryType;
  quantity: number;
  filePath: string;
}
