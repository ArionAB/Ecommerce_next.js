import { HoneyType } from "../../Store/Enums/Product/HoneyType";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";

export const setImageByHoneyType = (item: ProductItemModel, setBaseImage: Function) => {
  switch (item.productCategory) {
    case HoneyType.Poliflora:
      setBaseImage("/poliflora.jpg");
      break;
    case HoneyType.Salcam:
      setBaseImage("/salcam.jpg");
      break;
  }
};