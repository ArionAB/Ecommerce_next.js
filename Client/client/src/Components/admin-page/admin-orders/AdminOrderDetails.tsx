import {
  Box,
  Container,
  Dialog,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { OrderModel } from "../../../Store/Models/Order/OrderModel";
import {
  ConvertFruitTypeToLabel,
  ConvertProductCategoryType,
  ConvertSizeToLabel,
} from "../../../Utils/Functions/ConvertEnum";

export const AdminOrderDetails: FC<{
  open: boolean;
  selectedOrder: OrderModel | null;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}> = ({ open, selectedOrder, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <Box display="flex" flexDirection="column" p={2}>
        <Divider sx={{ marginBottom: "1rem", fontWeight: "600" }}>
          Detalii produse
        </Divider>

        {selectedOrder &&
          selectedOrder.orderProducts.map((product, index) => {
            return (
              <Grid
                container
                key={product.productId || index}
                flexDirection="column"
                height={30}
                padding={1}
              >
                <Grid item xs={12} width={"40%"}>
                  {product.title}
                </Grid>
                <Grid item xs={12}>
                  Tip miere:
                  {ConvertProductCategoryType(product.productCategory)}
                </Grid>
                <Grid item xs={12}>
                  Gramaj: {ConvertSizeToLabel(product.sizeType)}
                </Grid>
                <Grid item xs={12}>
                  Tip fruct: {ConvertFruitTypeToLabel(product.fruitType)}
                </Grid>
                <Grid item xs={12}>
                  Cantitate: {product.quantity}
                </Grid>
              </Grid>
            );
          })}

        <Divider sx={{ margin: "1rem 0", fontWeight: "600" }}>
          Detalii livrare
        </Divider>
        <Grid container display="flex" flexDirection="row">
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <Typography variant="h6" sx={{ margin: "0 auto" }}>
              Adresa livrare
            </Typography>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Adresa:{" "}
              </Typography>
              {selectedOrder?.shippingAddress?.address}
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Localitate:{" "}
              </Typography>
              {selectedOrder?.shippingAddress?.city}
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Judet:{" "}
              </Typography>
              {selectedOrder?.shippingAddress?.county}
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Info:{" "}
              </Typography>
              {selectedOrder?.shippingAddress?.info}
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Cod postal:{" "}
              </Typography>
            </Box>

            {selectedOrder?.shippingAddress?.zipCode}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <Typography variant="h6" sx={{ margin: "0 auto" }}>
              Billing address
            </Typography>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Adresa:{" "}
              </Typography>
              {selectedOrder?.shippingAddress?.addressBill}
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Localitate:{" "}
              </Typography>
              {selectedOrder?.shippingAddress?.cityBill}
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Judet:{" "}
              </Typography>
              {selectedOrder?.shippingAddress?.countyBill}
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Info:{" "}
              </Typography>
              {selectedOrder?.shippingAddress?.infoBill}
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Cod postal:{" "}
              </Typography>
            </Box>

            {selectedOrder?.shippingAddress?.zipCodeBill}
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};
