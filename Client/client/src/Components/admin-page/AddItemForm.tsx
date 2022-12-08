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
import { useAppDispatch } from "../../Store";
import { AddProductItemModel } from "../../Store/Models/Product/AddProductItem";
import { addProductItem } from "../../Store/Thunks/babyThunks";
import FileUploadComponent from "../fileUpload/FileUploadComponent";
import { BabySizeItems } from "../selectItems/BabySizeItems";

export const AddItemForm: FC<{ categoryType: string; productType: number }> = ({
  categoryType,
  productType,
}) => {
  const [textfield, setTextfield] = useState<any>([]);
  const [formValues, setFormValues] = useState<AddProductItemModel>({
    title: "",
    description: "",
    subcategoryType: categoryType,
    productCategory: productType,
    price: "",
    pictures: [],
  });

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, subcategoryType: categoryType }));
  }, [categoryType]);

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, productCategory: productType }));
  }, [productType]);

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
        productSize: arrayOfObjects,
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

        <Typography variant="h6">Cantitate</Typography>
        <Paper elevation={3}>
          {BabySizeItems.map((item, index) => {
            return (
              <MenuItem
                key={item.value}
                value={item.value}
                onKeyDown={(e) => e.stopPropagation()}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                {item.label}

                <TextField
                  name="quantity"
                  type="number"
                  onChange={(e) => handleQuantityChange(e, item.value, index)}
                />
              </MenuItem>
            );
          })}
        </Paper>

        <InputLabel className="input-label">
          <Typography variant="h6">Pret</Typography>
          <TextField onChange={(e) => handleChange(e)} name="price" />
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
