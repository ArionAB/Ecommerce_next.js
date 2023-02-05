import {
  Box,
  TextField,
  InputLabel,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Store";
import { AddProductItemModel } from "../../Store/Models/Product/AddProductItem";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import { addProductItem } from "../../Store/Thunks/productThunks";
import FileUploadComponent from "../fileUpload/FileUploadComponent";

export const AddItemForm: FC<{ fruitType: string; productType: number }> = ({
  fruitType,
  productType,
}) => {
  const [textfield, setTextfield] = useState<any>([]);
  const [formValues, setFormValues] = useState<AddProductItemModel>({
    title: "",
    description: "",
    fruitType: fruitType,
    productCategory: productType,
    priceKg: "",
    priceHalf: "",
    pictures: [],
  });

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, fruitType: fruitType }));
  }, [fruitType]);

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, productCategory: productType }));
  }, [productType]);

  const currentUser = useAppSelector(selectCurrentUser);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const dispatch = useAppDispatch();

  const uploadPictures = (newFiles: File[]) => {
    setFormValues({ ...formValues, pictures: newFiles });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arrayOfObjects = Object.values(textfield);

    dispatch(
      addProductItem({
        data: formValues,
        token: currentUser?.jwtToken,
      })
    );
  };

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    size: string,
    index: number
  ) => {
    const { value } = event.target;

    setTextfield({
      ...textfield,
      [index]: {
        size: size,
        quantity: value,
      },
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <InputLabel className="input-label">
          <Typography variant="h6">Nume</Typography>
          <TextField onChange={(e) => handleChange(e)} name="title" />
        </InputLabel>

        <InputLabel className="input-label">
          <Typography variant="h6">Descriere</Typography>
          <TextField
            onChange={(e) => handleChange(e)}
            name="description"
            multiline
            minRows={4}
          />
        </InputLabel>

        <InputLabel className="input-label">
          <Typography variant="h6">Pret la KG</Typography>
          <TextField onChange={(e) => handleChange(e)} name="priceKg" />
        </InputLabel>
        <InputLabel className="input-label">
          <Typography variant="h6">Pret la 500g</Typography>
          <TextField onChange={(e) => handleChange(e)} name="priceHalf" />
        </InputLabel>
      </Box>
      <Typography variant="h6">Poze</Typography>
      <FileUploadComponent onFilesChange={uploadPictures} />
      <Button variant="contained" type="submit">
        Adaugă produs
      </Button>
    </form>
  );
};
