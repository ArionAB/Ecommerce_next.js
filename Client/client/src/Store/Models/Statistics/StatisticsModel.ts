import { FruitType } from "../../Enums/Product/FruitType";
import { HoneyType } from "../../Enums/Product/HoneyType";
import { SizeType } from "../../Enums/SizeType";

export interface StatisticsModel {
  abandonedCartRate: number;
  averageOrderValue: number;
  customerRetentionRate: number;
  mostSoldHoneyType: {
    productCategory: HoneyType;
    totalOrders: number;
    totalQuantity: number;
  }[];
  mostSoldSizeType: {
    sizeType: SizeType;
    totalOrders: number;
    totalQuantity: number;
  }[];
  productSales: {
    fruitType: FruitType;
    productCateogry: HoneyType;
    productId: string;
    salesCount: number;
    sizeType: SizeType;
    title: string;
    // quantity: number;
    // mixedFruitId: string | null;
  }[];
}
