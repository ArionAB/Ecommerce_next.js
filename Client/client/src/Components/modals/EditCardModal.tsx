import { Container, Select, MenuItem, Box, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { CategoryItems } from "../selectItems/CategoryItems";
import Typography from "@mui/material/Typography";
import React, { useState, FC, ChangeEvent, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { FruitItems } from "../selectItems/FruitItems";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import { resourceUrl } from "../../Utils";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FileUploadComponent from "../fileUpload/FileUploadComponent";
import Button from "@mui/material/Button/Button";
import { useAppDispatch } from "../../Store";
import { updateProductItem } from "../../Store/Thunks/productThunks";
import { UpdateProductItemModel } from "../../Store/Models/Product/UpdateProductItemModel";

const EditCardModal: FC<{ card: ProductItemModel }> = ({ card }) => {
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<UpdateProductItemModel>({
    productId: card.productId,
    title: "",
    description: "",
    fruitType: Number(card.fruitType),
    productCategory: 2,
    priceKg: "",
    priceHalf: "",
    newAdditionalPictures: [],
  });

  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectCategory = (e: SelectChangeEvent) => {
    setFormValues({ ...formValues, productCategory: Number(e.target.value) });
  };

  const handleSelectSubCateogry = (e: SelectChangeEvent) => {
    setFormValues({ ...formValues, fruitType: Number(e.target.value) });
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
    setFormValues({ ...formValues, newAdditionalPictures: newFiles });
  };

  useEffect(() => {
    setFormValues({
      productId: card.productId,
      title: card.title,
      description: card.description,
      fruitType: Number(card.fruitType),
      productCategory: card.productCategory,
      priceKg: card.priceKg,
      priceHalf: card.priceHalf,
      newAdditionalPictures: [],
    });
    // setTextfield(card.productSizes);
  }, [card]);

  const submitUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(
      updateProductItem({
        data: formValues,
        deletedImages: deletedImages,
      })
    );
  };

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
          value={formValues.fruitType.toString()}
          label="Subcategory"
          onChange={handleSelectSubCateogry}
        >
          {FruitItems.map((item) => {
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

        <InputLabel className="input-label" sx={{ marginTop: "1rem" }}>
          <Typography variant="h6">Price</Typography>
          <TextField
            onChange={(e) => handleChange(e)}
            name="price"
            value={formValues.priceKg || ""}
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
          onClick={(e) => submitUpdate(e)}
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
