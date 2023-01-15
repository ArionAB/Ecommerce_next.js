import { SizeType } from "../../Enums/SizeType";

export interface ChangeQuantityModel {
  productId: string;
  sizeType: SizeType;
  quantity: number;
}
