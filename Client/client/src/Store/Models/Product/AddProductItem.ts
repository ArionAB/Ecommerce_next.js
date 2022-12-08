export interface quantityModel {
  size: number;
  quantity: number;
}

export interface AddProductItemModel {
  price: string;
  description: string;
  title: string;
  pictures: File[];
  subcategoryType: string;
  productCategory: number;
  productSize?: quantityModel[];
}
