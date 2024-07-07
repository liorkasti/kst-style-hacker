import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FilterClothing from "../components/FilterClothing";
import { SERVICES } from "../constants/strings";
import { useStyles } from "../constants/styles";
import { ClothingItemType, ColorType, SizeType } from "../constants/types";
import { useClothesTypeItems } from "../hooks/useClothingItems";
import { getNextType, getRecommendations } from "../hooks/useRecommende";
import { RootState } from "../store";
import {
  filtereClothes,
  selectClothes,
  setFilteredClothes,
} from "../store/slices/clothes-slice";
import { saveOutfit } from "../store/slices/outfits-slice";

const ClothesList: FC = () => {
  const [selectedItem, setSelectedItem] = useState<ClothingItemType | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<SizeType | "">("");
  const [selectedColor, setSelectedColor] = useState<ColorType | "">("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const type = new URLSearchParams(location.search).get("type") || "";
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    data: clothingTypeItems,
    isLoading,
    error,
  } = useClothesTypeItems(type);
  const clothingItems = useSelector((state: RootState) => state.clothes.items);

  const filteredItems = useMemo(() => {
    if (!clothingTypeItems) return [];
    let items = clothingTypeItems.filter(
      (item: ClothingItemType) => item.type === type
    );
    if (selectedSize) {
      items = items.filter((item) => item.size === selectedSize);
    }
    if (selectedColor) {
      items = items.filter(
        (item) => item.color.toLowerCase() === selectedColor.toLowerCase()
      );
    }
    return items;
  }, [clothingTypeItems, type, selectedSize, selectedColor]);

  useEffect(() => {
    if (clothingTypeItems) {
      dispatch(setFilteredClothes(clothingTypeItems));
    }
  }, []);

  const handleSelectItem = (item: ClothingItemType) => {
    // setSelectedItem(item);
    // console.log("item", item);
    const recommendations = getRecommendations(item, clothingItems);
    console.log({ recommendations });
    dispatch(selectClothes(item));

    if (recommendations.length > 0) {
      navigate(`/clothing-list?type=${getNextType(item.type)}`, {
        state: { recommendations },
      });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>Error loading items</Typography>;

  return (
    <Box className={classes.root}>
      <Box p={4}>
        <FilterClothing
          type={type}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <Grid
          container
          spacing={2}
          direction='row'
          justifyContent='center'
          alignItems='center'>
          {filteredItems.map((item: ClothingItemType) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Paper className={classes.card} elevation={3}>
                <Grid container alignItems='center' spacing={2}>
                  <Grid item xs={4}>
                    <img
                      className={classes.image}
                      src='https://via.placeholder.com/100'
                      alt={`${item.brand} ${item.type}`}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant='h6'>{item.brand}</Typography>
                    <Typography>{`${SERVICES.SIZE}: ${item.size}`}</Typography>
                    <Typography>{`${SERVICES.COLOR}: ${item.color}`}</Typography>
                    <Button
                      variant='contained'
                      color='primary'
                      className={classes.button}
                      onClick={() => handleSelectItem(item)}>
                      {SERVICES.SELECT}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{SERVICES.SAVE_SET}</DialogTitle>
          <DialogContent>
            <DialogContentText>{`You have selected all items. Would you like to save this set?`}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              {SERVICES.SAVE_SET}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ClothesList;
