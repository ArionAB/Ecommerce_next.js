import { HoneyType } from "../../Store/Enums/Product/HoneyType";

export const ConvertFruitTypeToLabel = (enumValue: number) => {
  switch (enumValue) {
    case 1:
      return "Nimic";
    case 2:
      return "Ananas";
    case 3:
      return "Aronia";
    case 4:
      return "Banane";
    case 5:
      return "Cocos";
    case 6:
      return "Curmale";
    case 7:
      return "Ghimbir";
    case 8:
      return "Goji";
    case 9:
      return "Lamaie";
    case 10:
      return "Mango";
    case 11:
      return "Merișor";
    case 12:
      return "Papaya";
  }
};

export const ConvertHoneyType = (enumValue: HoneyType) => {
  switch (enumValue) {
    case 1:
      return "All";
    case 2:
      return "Polifloră";
    case 3:
      return "Salcâm";
    case 4:
      return "Tei";
    case 5:
      return "Mană";
  }
};

export const ConvertSizeToLabel = (enumValue: number) => {
  switch (enumValue) {
    case 1:
      return "500g";
    case 2:
      return "1kg";
    default:
      return "500g";
  }
};

export const ConvertStatusToLabel = (enumValue: number) => {
  switch (enumValue) {
    case 1:
      return "Plasată";
    case 2:
      return "Procesată";
    case 3:
      return "Finalizată";
    case 4:
      return "Anulată";
    default:
      return "Plasată";
  }
};

export const ConvertPaymentMethodToLabel = (enumValue: number) => {
  switch (enumValue) {
    case 1:
      return "Numerar";
    case 2:
      return "Card";
    case 3:
      return "Transfer";

    default:
      return "Numerar";
  }
};
