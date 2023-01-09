// export interface quantityModel {
//   size: number;
//   quantity: number;
// }

export interface AddProductItemModel {
  price: string;
  description: string;
  title: string;
  pictures: File[];
  fruitType: string;
  productCategory: number;
  // productSize?: quantityModel[];
}
