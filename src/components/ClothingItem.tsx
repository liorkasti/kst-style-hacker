import React, { FC } from "react";
import { ClothingItemType } from "../../../shared/types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useStyles } from "../constants/styles";

type ClothingItemProps = {
  item: ClothingItemType;
  onSelect: (item: ClothingItemType) => void;
};

const ClothingItem: FC<ClothingItemProps> = ({ item, onSelect }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        component='img'
        image='https://via.placeholder.com/100'
        alt={`${item.brand} ${item.type}`}
        className={classes.image}
      />
      <CardContent>
        <Typography variant='h6'>{item.brand}</Typography>
        <Typography>Size: {item.size}</Typography>
        <Typography>Color: {item.color}</Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => onSelect(item)}>
          Select
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClothingItem;
