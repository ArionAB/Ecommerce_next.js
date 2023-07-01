'use client'

import { FC, useState, useEffect } from "react";
import { OrderModel } from "../../Store/Models/Order/OrderModel";
import { Box, Typography, CardMedia } from "@mui/material";
import styles from "../../../styles/orderDetails.module.scss";
import {
  ConvertFruitTypeToLabel,
  ConvertHoneyType,
  ConvertSizeToLabel,
} from "../../Utils/Functions/ConvertEnum";
import { resourceUrl } from "../../Utils";
import { FruitType } from "../../Store/Enums/Product/FruitType";
import { FruitItems } from "../selectItems/FruitItems";
import { HoneyType } from "../../Store/Enums/Product/HoneyType";
import Image from "next/image";
import { imageKitLoader } from "../../Utils/Functions/ImageKitLoader";

const OrderDetails: FC<{ selectedOrder: OrderModel | null }> = ({
  selectedOrder,
}) => {
  const [order, setOrder] = useState<OrderModel | null>(selectedOrder);

  useEffect(() => {
    setOrder(selectedOrder);

    //eslint disable-next-line
  }, [selectedOrder]);

  const handleConvertFruitTypeToLabel = (selectedFruits: string) => {
    const arr = selectedFruits.split(",").map((num) => Number(num.trim()));

    const labels = arr?.map((fruit) => {
      const item = FruitItems.find((item) => item.value === fruit);
      if (item) {
        return item.label;
      }
    });
    return labels?.join(", ");
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.order_id}>
        Coamnda #{order?.orderId}
        <span>({order?.totalProducts})</span>
      </Typography>
      {order?.orderProducts.map((product) => (
        <Box
          className={styles.each_order}
          key={product.productId + product.fruitType + product.sizeType}
        >
          <Box className={styles.left}>
            <Image
              src={
                product.productCategory === HoneyType.Poliflora
                  ? "/poliflora.jpg"
                  : "/salcam.jpg"
              }
              alt={product.title}
              className={styles.image}
              loader={imageKitLoader}
              width={125}
              height={93}
            />
            <Box className={styles.product}>
              <Typography variant="h6" className={styles.title}>
                {product.title}
              </Typography>
              <span className={styles.product_category}>
                {ConvertHoneyType(product.productCategory)}
              </span>
              {product.fruitType === FruitType.mixed ? (
                <span className={styles.fruit_type}>
                  Tip fruct:{" "}
                  {handleConvertFruitTypeToLabel(
                    product.mixedFruitId.toString()
                  )}
                </span>
              ) : (
                <span className={styles.fruit_type}>
                  Tip fruct: {ConvertFruitTypeToLabel(product.fruitType)}
                </span>
              )}

              <span>{ConvertSizeToLabel(product.sizeType)}</span>
            </Box>
          </Box>
          <Box className={styles.right}>
            {product.quantity * product.price} lei
            <span>{product.quantity}x buc.</span>
          </Box>
        </Box>
      ))}
    </Box>
  );
};


export default OrderDetails