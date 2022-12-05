import React, { FC } from "react";
import { Paper, Box } from "@mui/material";
import { BabyItemModel } from "../../Store/Models/Baby/BabyItem";
import Image from "next/image";

const Card: FC<{ card: BabyItemModel }> = ({ card }) => {
  //   console.log(card?.babyPictures[0]?.filePath);

  return (
    <Box>
      <Image
        src={card.babyPictures[0].filePath}
        alt="ceva"
        width={400}
        height={600}
      ></Image>
    </Box>
  );
};

export default Card;
