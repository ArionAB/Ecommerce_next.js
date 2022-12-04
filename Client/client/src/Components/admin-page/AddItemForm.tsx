import {
  Box,
  TextField,
  InputLabel,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  ListItemText,
  Checkbox,
  Paper,
} from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { useAppDispatch } from "../../Store";

import { AddBabyItemModel } from "../../Store/Models/Baby/AddBabyItem";
import { addBabyItem } from "../../Store/Thunks/babyThunks";
import FileUploadComponent from "../fileUpload/FileUploadComponent";
import { BabySizeItems } from "../selectItems/BabySizeItems";

export const AddItemForm: FC<{ categoryType: string }> = ({ categoryType }) => {
  const [formValues, setFormValues] = useState<AddBabyItemModel>({
    title: "",
    description: "",
    categoryType: categoryType,
    babySize: [],
    price: "",
    pictures: [],
  });

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, categoryType: categoryType }));
  }, [categoryType]);

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
      addBabyItem({
        data: formValues,
      })
    );
  };

  /* const handleSizeChange = (
    event: SelectChangeEvent<typeof formValues.babySize>
  ) => {
    const {
      target: { value },
    } = event;
    setFormValues(
      {
        ...formValues,
        babySize: typeof value === "string" ? value.split(",") : value,
      }
      // On autofill we get a stringified value.
    );
  }; */

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    size: string
  ) => {
    const { value } = event.target;
    const newQuantity = formValues.babySize;
    newQuantity.push({ size: Number(size), quantity: Number(value) });
    setFormValues({ ...formValues, babySize: newQuantity });
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

        {/*       <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formValues.babySize}
            label={formValues.babySize}
            onChange={handleSizeChange}
            renderValue={(selected) => selected.join(", ")}
            multiple
          >
            {BabySizeItems.map((item) => {
              return (
                <MenuItem key={item.value} value={item.value}>
                  <Checkbox
                    checked={formValues.babySize.indexOf(item.value) > -1}
                  />
                  <ListItemText primary={item.label} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
        <Typography variant="h6">Cantitate</Typography>
        <Paper elevation={3}>
          {BabySizeItems.map((item) => {
            return (
              <MenuItem
                key={item.value}
                value={item.value}
                onKeyDown={(e) => e.stopPropagation()}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                {item.label}

                <TextField
                  onChange={(e) => handleQuantityChange(e, item.value)}
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
