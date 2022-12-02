export interface quantityModel {
  size: string;
  quantity: string;
}

export interface AddBabyItemModel {
  price: string;
  babySize: string[];
  description: string;
  title: string;
  pictures: File[];
  categoryType: string;
  quantity: quantityModel[];
}
