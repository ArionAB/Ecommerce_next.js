import { ProductPictureModel } from "./ProductPicture";

export interface ProductItemModel {
  productId: string;

  productPictures: ProductPictureModel[];
  price: string;
  description: string;
  title: string;
  productCategory: number;
  fruitType: string;

  totalCategoryItems: string;
  totalSize: string;
}
