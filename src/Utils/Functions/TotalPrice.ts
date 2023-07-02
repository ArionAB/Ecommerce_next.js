import { SizeType } from "../../Store/Enums/SizeType";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";

export const TotalPrice = (cartItems: ProductItemModel[]) => {
  if (!cartItems || cartItems.length === 0) {
    return 0;
  }
  const items = cartItems?.reduce(
    (acc, item) =>
      acc +
      (Number(item.sizeType) === SizeType.Big
        ? Number(item.priceKg) * Number(item.quantity)
        : Number(item.priceHalf) * Number(item.quantity)),
    0
  );
  return items;
};
