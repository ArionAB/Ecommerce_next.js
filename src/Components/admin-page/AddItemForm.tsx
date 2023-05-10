import {
  Box,
  TextField,
  InputLabel,
  Button,
  Typography,
  MenuItem,
  Paper,
  FormControl,
  Select,
} from "@mui/material";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store";
import { AddProductItemModel } from "../../Store/Models/Product/AddProductItem";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import { addProductItem } from "../../Store/Thunks/productThunks";
import FileUploadComponent from "../fileUpload/FileUploadComponent";
import { CategoryItems } from "../selectItems/CategoryItems";
import { FruitItems } from "../selectItems/FruitItems";

export const AddItemForm = () => {
  const [formValues, setFormValues] = useState<AddProductItemModel>({
    title: "",
    description: "",
    fruitType: "",
    productCategory: "",
    priceKg: "",
    priceHalf: "",
    pictures: [],
  });

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

    dispatch(
      addProductItem({
        data: formValues,
        token: currentUser?.jwtToken,
      })
    );
  };

  return (
    <Container>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tip miere</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formValues.productCategory || ""}
              label="Tip fruct"
              name="productCategory"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  productCategory: e.target.value,
                })
              }
            >
              {CategoryItems.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tip Fruct</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formValues.fruitType || ""}
              label="Tip fruct"
              name="fruitType"
              onChange={(e) =>
                setFormValues({ ...formValues, fruitType: e.target.value })
              }
            >
              {FruitItems.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
    </Container>
  );
};
