import { FruitType } from "../../Store/Enums/Product/FruitType";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";

export const setImageByFruitType = (item: ProductItemModel, setBaseImage: Function) => {

  switch (Number(item.fruitType)) {
    case FruitType.almond:
      setBaseImage("/migdale-fulgi.webp")
      break;
    case FruitType.ananas:
      setBaseImage("/ananas-cuburi.jpg")
      break;
    case FruitType.aronia:
      setBaseImage("/aronia.jpg")
      break;
    case FruitType.banane:
      setBaseImage("/Banana-chips.jpg")
      break;
    case FruitType.caju:
      setBaseImage("/caju-crud.webp")
      break;
    case FruitType.catina:
      setBaseImage('/catina3.jpg')
      break;
    case FruitType.cocos:
      setBaseImage("/Cocos-cub.jpg")
      break;
    case FruitType.ghimbir:
      setBaseImage("/Ghimbir-cuburi.jpg")
      break;
    case FruitType.goji:
      setBaseImage("/Goji.jpg")
      break;
    case FruitType.lamaie:
      setBaseImage("/lemon.jpg")
      break;
    case FruitType.mango:
      setBaseImage("/mango-confiat.jpg")
      break;
    case FruitType.merisor:
      setBaseImage("/Merisor.jpg")
      break;
    case FruitType.mixed:
      setBaseImage("/mix.png")
      break;
    case FruitType.papaya:
      setBaseImage("/Papaya-bub.jpg")
      break;
    case FruitType.walnut:
      setBaseImage("/miez-nuca.jpg")
      break;
  }
}