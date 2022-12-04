export interface quantityModel {
  size: number;
  quantity: number;
}

export interface AddBabyItemModel {
  price: string;
  description: string;
  title: string;
  pictures: File[];
  categoryType: string;
  babySize: quantityModel[];
}
