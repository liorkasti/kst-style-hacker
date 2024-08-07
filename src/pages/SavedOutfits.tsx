import { Box, Grid, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SERVICES } from "../constants/strings";
import { THEME, useStyles } from "../constants/styles";
import { ClothingItemType, OutfitProps } from "../constants/types";
import { RootState } from "../store";
import { deleteOutfit } from "../store/slices/clothes-slice";
import CustomButton from "../components/CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";

const SavedOutfits: FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { outfits } = useSelector((state: RootState) => state.clothes);

  const handleDeleteOutfit = (id: string) => {
    dispatch(deleteOutfit(id));
  };

  return (
    <Box className={classes.root}>
      <Box p={4}>
        <Typography mb={2} variant='h4'>
          {SERVICES.SAVED_OUTFITS_TITLE}
        </Typography>
        <Grid container spacing={2} direction='row' justifyContent='center'>
          {outfits.length ? (
            outfits?.map((item: OutfitProps) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Paper className={classes.card} elevation={3}>
                  <Typography
                    style={{ color: THEME.subtext }}
                    className={classes.savedItemTitle}>
                    {`${SERVICES.CREATION_DATE}: ${item.creationDate}`}
                  </Typography>
                  <Typography
                    style={{ color: THEME.modalTitle }}
                    className={classes.savedItemTitle}>
                    {`${SERVICES.CREATION_TIME}: ${item.creationTime}`}
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    direction='row'
                    justifyContent='center'
                    alignItems='center'>
                    {item.items.map((clothingItem: ClothingItemType) => (
                      <Grid item key={item.id} xs={12} sm={6} md={4}>
                        <Grid item>
                          <Typography>{`${clothingItem.type}`}</Typography>
                          <img
                            className={classes.image}
                            src='https://via.placeholder.com/100'
                            alt={`${clothingItem.brand} ${clothingItem.type}`}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  <CustomButton
                    onClick={() => handleDeleteOutfit(item.id)}
                    startIcon={<DeleteIcon />}
                    text={SERVICES.DELETE_OUTFIT}
                    color={THEME.secondary}
                    hover={THEME.secondary}
                    isDisabled={false}
                  />
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography>{SERVICES.NO_SAVED_OUTFITS}</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default SavedOutfits;
