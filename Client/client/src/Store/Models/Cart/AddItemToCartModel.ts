import { FruitType } from "../../Enums/Product/FruitType";

export interface AddItemToCartModel {
  cartItems: [
    {
      productId: string;
      sizeType: number;
      quantity: number;
      mixedFruitId: FruitType[] | undefined;
    }
  ];
}
