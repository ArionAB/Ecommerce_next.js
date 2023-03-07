import { FC, useState, useEffect } from "react";
import { OrderModel } from "../../Store/Models/Order/OrderModel";
import { Box, Typography, CardMedia } from "@mui/material";
import styles from "../../../styles/orderDetails.module.scss";
import {
  ConvertFruitTypeToLabel,
  ConvertProductCategoryType,
  ConvertSizeToLabel,
} from "../../Utils/Functions/ConvertEnum";
import { resourceUrl } from "../../Utils";

export const OrderDetails: FC<{ selectedOrder: OrderModel | null }> = ({
  selectedOrder,
}) => {
  const [order, setOrder] = useState<OrderModel | null>(selectedOrder);

  useEffect(() => {
    setOrder(selectedOrder);

    //eslint disable-next-line
  }, [selectedOrder]);

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.order_id}>
        Coamnda #{order?.orderId}
        <span>({order?.totalProducts})</span>
      </Typography>
      {order?.orderProducts.map((product) => (
        <Box className={styles.each_order} key={product.productId}>
          <Box className={styles.left}>
            <CardMedia
              component="img"
              src={resourceUrl + product.filePath}
              className={styles.image}
            />
            <Box className={styles.product}>
              <Typography variant="h6" className={styles.title}>
                {product.title}
              </Typography>
              <span className={styles.product_category}>
                {ConvertProductCategoryType(product.productCategory)}
              </span>
              <span className={styles.fruit_type}>
                Tip fruct: {ConvertFruitTypeToLabel(product.fruitType)}
              </span>
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
