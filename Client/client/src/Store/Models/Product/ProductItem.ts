import { quantityModel } from "./AddProductItem";
import { ProductPictureModel } from "./ProductPicture";

export interface ProductItemModel {
  productId: string;
  productSizes: quantityModel[];
  productPictures: ProductPictureModel[];
  price: string;
  description: string;
  title: string;
  productCategory: number;
  subcategoryType: string;
  quantity: string;
  totalCategoryItems: string;
  totalSize: string;
}
