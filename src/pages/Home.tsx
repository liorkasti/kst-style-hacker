import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVICES } from "../constants/strings";
import { ClothingItemType } from "../constants/types";
import { useClothingItems } from "../hooks/useClothingItems";
import { useDispatch, useSelector } from "react-redux";
import { setClothes } from "../store/slices/clothes-slice";
import { RootState } from "../store";
import { useStyles } from "../constants/styles";

const Home: FC = () => {
  const [selectedItems, setSelectedItems] = useState<ClothingItemType[]>([]);
  const dispatch = useDispatch();

  const { data: clothingItems, isLoading: loadingItems } = useClothingItems();

  const { items, shoesCount, shirtsCount, pantsCount, selected } = useSelector(
    (state: RootState) => state.clothes
  );

  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    if (clothingItems) {
      dispatch(setClothes(items));
      console.log({ items });
      localStorage.setItem("clothingItems", JSON.stringify(items));
    }
  }, [items, dispatch]);

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
                {loadingItems ? <CircularProgress size={12} /> : shoesCount}
              </Typography>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <Typography>
                {SERVICES.AVAILABLE_SHIRTS}
                {loadingItems ? <CircularProgress size={12} /> : shirtsCount}
              </Typography>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <Typography>
                {SERVICES.AVAILABLE_PANTS}
                {loadingItems ? <CircularProgress size={12} /> : pantsCount}
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
              //   selected.some((item) => item.type === "shoes")
              //     ? "secondary"
              //     : "primary"
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
