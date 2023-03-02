import { CartItemModel } from "./CartItemModel";

export interface AddItemToCartModel {
  cartItems: [
    {
      productId: string;
      sizeType: number;
      quantity: number;
    }
  ];
}
