import SaveIcon from "@mui/icons-material/Save";
import ShoesIcon from "@mui/icons-material/RollerSkating";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ClothingItem from "../components/ClothingItem";
import { ENDPOINTS, SCREEN_NAMES, SERVICES } from "../constants/strings";
import { THEME, useStyles } from "../constants/styles";
import { ClothingItemType } from "../constants/types";
import { useClothesTypeItems } from "../hooks/useClothingItems";
import { getNextType, getRecommendations } from "../hooks/useRecommende";
import { RootState } from "../store";
import { selectClothes } from "../store/slices/clothes-slice";

const Home: FC = () => {
  // const [recommendations, setRecommendations] = useState<ClothingItemType[]>(
  //   []
  // );
  const { isLoading: loadingItems } = useClothesTypeItems("");
  const { items, selected, shoesCount, shirtsCount, pantsCount } = useSelector(
    (state: RootState) => state.clothes
  );
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const hasShoes = selected.some((i) => i.type === "shoes");
  const hasShirt = selected.some((i) => i.type === "shirt");
  const hasPants = selected.some((i) => i.type === "pants");

  const recommendations = location.state?.recommendations || [];

  const ShirtIcon = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='24'
      height='24'>
      <path
        d='M10 4v2H8V4h2m4 0v2h-2V4h2M8 2h8v4h4l-1 15H5L4 6h4V2m2 4v2h4V6h2l-.8 9H8.8L8 6h2z'
        fill={hasShirt ? "rgba(0, 0, 0, 0.26)" : "white"}
      />
    </svg>
  );

  const PantsIcon = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 64 64'
      width='24'
      height='24'>
      <path
        d='M20,2V12H44V2ZM16,12H48L44,60H36L32,32H28L24,60H16Z'
        fill={hasPants ? "rgba(0, 0, 0, 0.26)" : "white"}
      />
    </svg>
  );

  const handleSelectItem = (item: ClothingItemType) => {
    dispatch(selectClothes(item));
    const nextItem = getNextType(item.type);
    const recommendations: ClothingItemType[] = getRecommendations(item, items);
    navigate(`/clothing-list?type=${nextItem}`, {
      state: { recommendations },
    });
  };

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

        <Box pb={4}>
          <Grid container direction='row' spacing={2} mr={2} mt={2}>
            <Grid item>
              <Button
                variant='contained'
                size='small'
                sx={{
                  color: "white",
                  backgroundColor: THEME.primary,
                  "&:hover": {
                    backgroundColor: THEME.hover,
                  },
                }}
                disabled={hasShoes ? true : false}
                onClick={() =>
                  navigate(ENDPOINTS.SHOES, {
                    state: { recommendations },
                  })
                }
                startIcon={<ShoesIcon />}>
                {SERVICES.SELECT_SHOES}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                sx={{
                  color: "white",
                  backgroundColor: THEME.primary,
                  "&:hover": {
                    backgroundColor: THEME.hover,
                  },
                }}
                disabled={hasShirt ? true : false}
                size='small'
                onClick={() =>
                  navigate(ENDPOINTS.SHIRTS, {
                    state: { recommendations },
                  })
                }
                startIcon={<ShirtIcon />}>
                {SERVICES.SELECT_SHIRT}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                sx={{
                  color: "white",
                  backgroundColor: THEME.primary,
                  "&:hover": {
                    backgroundColor: THEME.hover,
                  },
                }}
                disabled={hasPants ? true : false}
                size='small'
                onClick={() =>
                  navigate(ENDPOINTS.PANTS, {
                    state: { recommendations },
                  })
                }
                startIcon={<PantsIcon />}>
                {SERVICES.SELECT_PANTS}
              </Button>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Button
                variant='contained'
                sx={{
                  color: "white",
                  backgroundColor: THEME.secondary,
                  "&:hover": {
                    backgroundColor: "",
                  },
                }}
                size='small'
                onClick={() => navigate(ENDPOINTS.SAVED_SETS)}
                startIcon={<SaveIcon />}
                style={{ marginRight: 16 }}>
                {SCREEN_NAMES.SAVED_SETS}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {recommendations.length ? (
          <>
            <Typography mb={2} variant='h4'>
              Recommendations:
            </Typography>
            <Box className={classes.recommendationsContainer}>
              {recommendations.map((item: ClothingItemType) => (
                <Grid
                  item
                  key={item.id}
                  className={classes.recommendationItem}
                  mr={2}
                  minWidth={250}>
                  <ClothingItem
                    item={item}
                    onSelect={() => handleSelectItem(item)}
                  />
                </Grid>
              ))}
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default Home;
