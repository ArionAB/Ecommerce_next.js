import { HoneyType } from "../../Store/Enums/Product/HoneyType";

export const ConvertFruitTypeToLabel = (enumValue: number) => {
  switch (enumValue) {
    case 1:
      return "";
    case 2:
      return "Ananas";
    case 3:
      return "Aronia";
    case 4:
      return "Banane";
    case 5:
      return "Cocos";
    case 6:
      return "Cătină";
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
    case 13:
      return "Mix fructe";
    case 14:
      return "Nucă";
    case 15:
      return "Migdale";
    case 16:
      return "Caju";
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

export const ConvertMonthToLabel = (enumValue: number) => {
  switch (enumValue) {
    case 1:
      return "Ianuarie";
    case 2:
      return "Februarie";
    case 3:
      return "Martie";
    case 4:
      return "Aprilie";
    case 5:
      return "Mai";
    case 6:
      return "Iunie";
    case 7:
      return "Iulie";
    case 8:
      return "August";
    case 9:
      return "Septembrie";
    case 10:
      return "Octombrie";
    case 11:
      return "Noiembrie";
    case 12:
      return "Decembrie";
  }
};
