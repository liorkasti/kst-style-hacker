import { Button, Grid, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { SERVICES } from "../constants/strings";
import { useStyles } from "../constants/styles";
import { ClothingItemType } from "../constants/types";

type ClothingItemProps = {
  item: ClothingItemType;
  onSelect: (item: ClothingItemType) => void;
  isSelected?: boolean;
};

const ClothingItem: FC<ClothingItemProps> = ({
  item,
  onSelect,
  isSelected,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.card} elevation={3}>
      <Grid container direction='row' spacing={2}>
        <Grid item xs={4} mr={3}>
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
          {isSelected ? (
            <Button
              variant='contained'
              color='secondary'
              onClick={() => onSelect(item)}
              className={classes.button}
              fullWidth
              sx={{ mt: 2 }}>
              {SERVICES.DELETE_OUTFIT}
            </Button>
          ) : (
            <Button
              variant='contained'
              color='primary'
              onClick={() => onSelect(item)}>
              {SERVICES.SELECT}
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ClothingItem;
