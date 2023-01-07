import {
  Container,
  Select,
  MenuItem,
  Box,
  TextField,
  Paper,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { CategoryItems } from "../selectItems/CategoryItems";
import Typography from "@mui/material/Typography";
import React, { useState, FC, ChangeEvent, useEffect } from "react";
import { AddProductItemModel } from "../../Store/Models/Product/AddProductItem";
import { BabySizeItems } from "../selectItems/BabySizeItems";
import { SelectChangeEvent } from "@mui/material/Select";
import { SubCategoryItems } from "../selectItems/SubCategoryItems";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import { resourceUrl } from "../../Utils";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FileUploadComponent from "../fileUpload/FileUploadComponent";
import Button from "@mui/material/Button/Button";

const EditCardModal: FC<{ card: ProductItemModel }> = ({ card }) => {
  const [textfield, setTextfield] = useState<any>([]);
  const [formValues, setFormValues] = useState<AddProductItemModel>({
    title: "",
    description: "",
    subcategoryType: "",
    productCategory: 2,
    price: "",
    pictures: [],
  });
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
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

  const handleSelectCategory = (e: SelectChangeEvent) => {
    setFormValues({ ...formValues, productCategory: Number(e.target.value) });
  };

  const handleSelectSubCateogry = (e: SelectChangeEvent) => {
    setFormValues({ ...formValues, subcategoryType: e.target.value });
  };

  const handleDeletedImages = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setDeletedImages([...deletedImages, value]);
    } else {
      const filteredImages = deletedImages.filter((image) => image !== value);
      setDeletedImages(filteredImages);
    }
  };

  const uploadPictures = (newFiles: File[]) => {
    setFormValues({ ...formValues, pictures: newFiles });
  };

  useEffect(() => {
    setFormValues({
      title: card.title,
      description: card.description,
      subcategoryType: card.subcategoryType,
      productCategory: card.productCategory,
      price: card.price,
      pictures: [],
    });
    setTextfield(card.productSizes);
  }, [card]);

  return (
    <Container maxWidth="xl">
      <form>
        {/* <FormControl fullWidth> */}
        <InputLabel id="category-select" sx={{ marginTop: "1rem" }}>
          Category
        </InputLabel>
        <Select
          fullWidth
          labelId="category-select"
          id="demo-simple-select"
          value={formValues.productCategory.toString()}
          label="Age"
          onChange={handleSelectCategory}
        >
          {CategoryItems.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
        <InputLabel id="subcategory-select" sx={{ marginTop: "1rem" }}>
          Sub Category
        </InputLabel>
        <Select
          fullWidth
          labelId="subcategory-select"
          id="subcategory-select"
          value={formValues.subcategoryType}
          label="Subcategory"
          onChange={handleSelectSubCateogry}
        >
          {SubCategoryItems.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
        {/* </FormControl> */}
        <InputLabel className="input-label" sx={{ marginTop: "1rem" }}>
          <Typography variant="h6">Name</Typography>
          <TextField
            onChange={(e) => handleChange(e)}
            name="title"
            value={formValues.title || ""}
          />
        </InputLabel>

        <InputLabel className="input-label">
          <Typography variant="h6" sx={{ marginTop: "1rem" }}>
            Description
          </Typography>
          <TextField
            onChange={(e) => handleChange(e)}
            name="description"
            multiline
            minRows={4}
            value={formValues.description || ""}
          />
        </InputLabel>

        <InputLabel sx={{ marginTop: "1rem" }}>
          Quantity
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
                    value={textfield[index]?.quantity || ""}
                  />
                </MenuItem>
              );
            })}
          </Paper>
        </InputLabel>

        <InputLabel className="input-label" sx={{ marginTop: "1rem" }}>
          <Typography variant="h6">Price</Typography>
          <TextField
            onChange={(e) => handleChange(e)}
            name="price"
            value={formValues.price || ""}
          />
        </InputLabel>
        <InputLabel className="input-label" sx={{ marginTop: "1rem" }}>
          <Typography variant="h6">Delete</Typography>
          <FormGroup>
            {card?.productPictures.map((item) => {
              return (
                <Box
                  key={item.pictureId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                  mb={2}
                >
                  <img
                    src={resourceUrl + item.filePath}
                    alt={item.fileNmae}
                    width={150}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        color="warning"
                        name="Delete"
                        value={item.pictureId}
                        onChange={(e) => handleDeletedImages(e)}
                      />
                    }
                    label="Delete"
                  ></FormControlLabel>
                </Box>
              );
            })}
          </FormGroup>
        </InputLabel>
        <InputLabel sx={{ margin: "1rem" }}>Add Additional Pictures</InputLabel>
        <FileUploadComponent onFilesChange={uploadPictures} />
        <Button
          variant="contained"
          type="submit"
          sx={{
            margin: "1rem",
          }}
        >
          Update Product
        </Button>
      </form>
    </Container>
  );
};

export default EditCardModal;
