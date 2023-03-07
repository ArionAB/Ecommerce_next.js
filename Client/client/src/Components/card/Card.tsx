import React, { FC, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import Image from "next/image";
import { resourceUrl } from "../../Utils";
import styles from "../../../styles/card.module.scss";
import { Options } from "../modals/Options";
import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditCardModal from "../modals/EditCardModal";
import Close from "@mui/icons-material/Close";
import ConfirmationMessage from "../notifications/ConfirmationMessage";
import { useAppDispatch, useAppSelector } from "../../Store";
import { deleteProduct } from "../../Store/Thunks/productThunks";
import ProductDetails from "../../../pages/miere/[productDetails]";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import { UserType } from "../../Store/Enums/UserType";
import { setProductItem } from "../../Store/Slices/productSlice";

const Card: FC<{
  card: ProductItemModel;
  expand: boolean;
  containerIndex: number;
  index: number;
}> = ({ card, expand, containerIndex, index }) => {
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const [imageSource, setImageSource] = useState<string>(
    card.productPictures[0].filePath
  );
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [openConfirmationMessage, setOpenConfirmationMessage] =
    useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<any>(null);
  const [openShop, setOpenShop] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

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

  return (
    <Box className={styles.cardContainer} component="div">
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

            <EditCardModal card={card} />
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
      <Link href={`/miere/${card.productId}`} onClick={handleSetItem}>
        <Image
          src={resourceUrl + imageSource}
          onMouseEnter={() => {
            setImageSource(card.productPictures[1].filePath);
          }}
          onMouseLeave={() => {
            setImageSource(card.productPictures[0].filePath);
          }}
          loader={imageLoader}
          alt={card.title}
          width={280}
          height={400}
          quality={100}
          unoptimized={true}
        ></Image>
      </Link>
      <Typography variant="h6" className={styles.price}>
        {card.priceKg} lei <span>1kg</span>
      </Typography>
      <Typography className={styles.title}>{card.title}</Typography>
      {expand && containerIndex === index && (
        <Box className={styles.twoButtons}>
          <Button className={styles.shop} onClick={() => setOpenShop(true)}>
            Quick Shop
          </Button>
          <Button
            className={styles.options}
            onClick={() => setOpenOptions(true)}
          >
            Choose Options
          </Button>
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
    </Box>
  );
};

export default Card;
