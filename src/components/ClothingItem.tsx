import { Grid, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { SERVICES } from "../constants/strings";
import { useStyles } from "../constants/styles";
import { ClothingItemType } from "../constants/types";
import CustomButton from "./CustomButton";
import CheckroomIcon from "@mui/icons-material/Checkroom";

type ClothingItemProps = {
  item: ClothingItemType;
  onSelect: (item: ClothingItemType) => void;
  isSaved?: boolean;
};

const ClothingItem: FC<ClothingItemProps> = ({ item, onSelect, isSaved }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.card} elevation={3}>
      <Grid container direction='row' spacing={2}>
        <Grid item xs={4} mr={4}>
          <img
            className={classes.image}
            src='https://via.placeholder.com/100'
            alt={`${item.brand} ${item.type}`}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6'>{item.brand}</Typography>
          <Typography>{`${SERVICES.SIZE}: ${item.size}`}</Typography>
          <Typography>{`${SERVICES.COLOR}: ${item.color}`}</Typography>
          {isSaved ? (
            <CustomButton
              onClick={() => onSelect(item)}
              text={SERVICES.DELETE_OUTFIT}
              isDisabled={undefined}
            />
          ) : (
            <CustomButton
              onClick={() => onSelect(item)}
              text={SERVICES.SELECT}
              startIcon={<CheckroomIcon />}
              isDisabled={undefined}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ClothingItem;
