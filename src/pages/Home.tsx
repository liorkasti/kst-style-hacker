import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVICES } from "../constants/strings";
import { ClothingItemType } from "../constants/types";
import { useClothingItems } from "../hooks/useClothingItems";
import { useDispatch, useSelector } from "react-redux";
import { setClothes } from "../store/slices/clothes-slice";
import { RootState } from "../store";

const Home: FC = () => {
  const [selectedItems, setSelectedItems] = useState<ClothingItemType[]>([]);
  const [itemCounts, setItemCounts] = useState({
    shoes: 0,
    shirts: 0,
    pants: 0,
  });
  const dispatch = useDispatch();

  const { data: clothingItems, isLoading: loadingItems } = useClothingItems();

  const { items, filteredItems, selected } = useSelector(
    (state: RootState) => state.clothes
  );
  console.log({ /* items, filteredItems,  */ selected });

  const navigate = useNavigate();

  useEffect(() => {
    if (clothingItems) {
      dispatch(setClothes(clothingItems));
      const shoesCount = clothingItems.filter(
        (item) => item.type === "shoes"
      ).length;
      const shirtsCount = clothingItems.filter(
        (item) => item.type === "shirt"
      ).length;
      const pantsCount = clothingItems.filter(
        (item) => item.type === "pants"
      ).length;
      setItemCounts({
        shoes: shoesCount,
        shirts: shirtsCount,
        pants: pantsCount,
      });
    }
  }, [clothingItems, dispatch]);

  useEffect(() => {
    const savedSelectedItems = JSON.parse(
      localStorage.getItem("selectedItems") || "[]"
    );
    setSelectedItems(savedSelectedItems);
  }, []);

  return (
    <Box>
      <Box p={4}>
        <Typography mb={2} variant='h4'>
          {SERVICES.STYLE_HACKER_TITLE}
        </Typography>
        <Grid container spacing={2} mb={4}>
          <Grid item>
            <Typography>
              <Typography>
                {SERVICES.AVAILABLE_SHOES}
                {loadingItems ? (
                  <CircularProgress size={12} />
                ) : (
                  itemCounts.shoes
                )}
              </Typography>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <Typography>
                {SERVICES.AVAILABLE_SHIRTS}
                {loadingItems ? (
                  <CircularProgress size={12} />
                ) : (
                  itemCounts.shirts
                )}
              </Typography>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <Typography>
                {SERVICES.AVAILABLE_PANTS}
                {loadingItems ? (
                  <CircularProgress size={12} />
                ) : (
                  itemCounts.pants
                )}
              </Typography>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction='column'
          alignItems='center'
          spacing={2}
          mt={4}>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              // color={
              //   selectedItems.some((item) => item.type === 'shoes')
              //     ? 'secondary'
              //     : 'primary'
              // }
              onClick={() => navigate("/clothing-list?type=shoes")}
              // disabled={selectedItem === 'shoes'}
            >
              {SERVICES.SELECT_SHOES}
              {/* {selectedItem === 'shoes' ? 'Shoes Selected' : 'Select Shoes'} */}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={() => navigate("/clothing-list?type=shirt")}>
              {SERVICES.SELECT_SHIRT}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={() => navigate("/clothing-list?type=pants")}>
              {SERVICES.SELECT_PANTS}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box p={4}>
        <Grid container spacing={2} justifyContent='space-between'>
          <Grid item>
            <Link to='/clothing-list'>
              <Button variant='contained' color='primary'>
                Select Clothes
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link to='/saved-sets'>
              <Button variant='contained' color='primary'>
                View Saved Sets
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
