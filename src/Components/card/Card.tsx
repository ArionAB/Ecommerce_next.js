import React, { FC, useState, useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import Image from "next/image";
import { resourceUrl } from "../../Utils";
import styles from "../../../styles/card.module.scss";
import { Options } from "../modals/Options";
import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateProductModal from "../modals/UpdateProductModal";
import Close from "@mui/icons-material/Close";
import ConfirmationMessage from "../notifications/ConfirmationMessage";
import { useAppDispatch, useAppSelector } from "../../Store";
import { deleteProduct } from "../../Store/Thunks/productThunks";
import ProductDetails from "../../../pages/miere/[productDetails]";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import { UserType } from "../../Store/Enums/UserType";
import { setProductItem } from "../../Store/Slices/productSlice";
import { HoneyType } from "../../Store/Enums/Product/HoneyType";
import { usePageWidth } from "../../Utils/Hooks/usePageWidth";

const Card: FC<{
  card: ProductItemModel;
  // expand: boolean;
  // containerIndex: number;
  index: number;
  carousel: boolean;
}> = ({ card, index, carousel }) => {
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const [imageSource, setImageSource] = useState<string>(
    card.productPictures[0].filePath
  );
  const [baseImage, setBaseImage] = useState<string>("");
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [openConfirmationMessage, setOpenConfirmationMessage] =
    useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<any>(null);
  const [openShop, setOpenShop] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(true);
  const [containerIndex, setContainerIndex] = useState<number>(0);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const pageWidth = usePageWidth();

  const imageLoader = () => {
    return `${resourceUrl}${imageSource}`;
  };

  const handleCloseOptions = () => {
    setOpenOptions(false);
  };
  const handleCloseShop = () => {
    setOpenShop(false);
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(card.productId));
  };

  const handleSetItem = () => {
    dispatch(setProductItem(card));
  };

  const setImageByHoneyType = () => {
    switch (card.productCategory) {
      case HoneyType.Poliflora:
        setBaseImage("/poliflora.jpg");
        break;
      case HoneyType.Salcam:
        setBaseImage("/salcam.jpg");
        break;
    }
  };

  useEffect(() => {
    setImageByHoneyType();
  }, []);

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      className={styles.cardContainer}
      sx={{
        // height: carousel ? "430px" : "auto",
        borderRadius:
          (expand && containerIndex === index) || pageWidth < 900
            ? "0px"
            : "40px",
      }}
      onMouseEnter={() => {
        setExpand(true);
        setContainerIndex(index);
      }}
      onMouseLeave={() => {
        setExpand(false);
      }}
    >
      {!card.inStock && <div className={styles.ribbon}>Out of Stock</div>}

      {currentUser?.userType === UserType.Admin && (
        <>
          <EditIcon
            className={styles.edit}
            onClick={() => setEditDialog(true)}
          />
          <Dialog open={editDialog} fullWidth maxWidth="md">
            <Box onClick={() => setEditDialog(false)}>
              <Close
                sx={{ float: "right", margin: "1rem", cursor: "pointer" }}
              />
            </Box>

            <UpdateProductModal card={card} setEditDialog={setEditDialog} />
          </Dialog>
          <DeleteForeverIcon
            className={styles.delete}
            onClick={(e) => {
              setOpenConfirmationMessage(true);
              setCurrentTarget(e.currentTarget);
            }}
          />
        </>
      )}
      <ConfirmationMessage
        message={`Are you sure you want to delete ${card.title} ?`}
        open={openConfirmationMessage}
        currentTarget={currentTarget}
        setCurrentTarget={setCurrentTarget}
        close={setOpenConfirmationMessage}
        deleteProduct={handleDeleteProduct}
      />
      <Link
        href={`/miere/${card.title.replaceAll(" ", "_")}`}
        onClick={handleSetItem}
      >
        <Image
          src={baseImage ? baseImage : resourceUrl + imageSource}
          onMouseEnter={() => {
            setBaseImage("");
          }}
          onMouseLeave={() => {
            setImageByHoneyType();
          }}
          loader={baseImage ? undefined : imageLoader}
          alt={card.title}
          width={280}
          height={300}
          quality={100}
          // layout="responsive"
          unoptimized={true}
          draggable={false}
        ></Image>
      </Link>
      <Typography variant="h6" className={styles.price}>
        {card.priceKg} lei
        <span> 1 kg</span>
      </Typography>
      <Typography className={styles.title}>{card.title}</Typography>
      {(pageWidth < 900 || (expand && containerIndex === index)) && (
        <Box className={styles.bottom}>
          <Box className={styles.twoButtons}>
            <Button className={styles.shop} onClick={() => setOpenShop(true)}>
              Detalii
            </Button>
            <Button
              className={styles.options}
              onClick={() => setOpenOptions(true)}
            >
              Opțiuni
            </Button>
          </Box>
        </Box>
      )}
      <Dialog open={openOptions} onClose={handleCloseOptions}>
        <Options handleClose={handleCloseOptions} card={card} />
      </Dialog>
      <Dialog open={openShop} maxWidth="lg" onClose={handleCloseShop}>
        <ProductDetails
          handleClose={handleCloseShop}
          open={openShop}
          card={card}
        />
      </Dialog>
    </Grid>
  );
};

export default Card;
