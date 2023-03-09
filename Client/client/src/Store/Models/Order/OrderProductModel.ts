import { FruitType } from "../../Enums/Product/FruitType";
import { HoneyType } from "../../Enums/Product/HoneyType";
import { SizeType } from "../../Enums/SizeType";

export interface OrderProductModel {
  productId: string;
  title: string;
  price: number;
  sizeType: SizeType;
  fruitType: FruitType;
  productCategory: HoneyType;
  quantity: number;
  filePath: string;
}
