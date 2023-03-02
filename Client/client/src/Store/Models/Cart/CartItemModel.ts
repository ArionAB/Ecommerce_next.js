import { SizeType } from "../../Enums/SizeType";

export interface CartItemModel {
  productId: string;
  sizeType: SizeType;
  quantity: number;
}
