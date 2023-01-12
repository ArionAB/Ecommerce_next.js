import { SizeType } from "../../Enums/SizeType";

export interface AddItemToCartModel {
  productId: string;
  sizeType: SizeType;
  quantity: number;
}
