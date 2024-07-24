import ShoesIcon from "@mui/icons-material/RollerSkating";
import SaveIcon from "@mui/icons-material/Save";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClothingItem from "../components/ClothingItem";
import CustomButton from "../components/CustomButton";
import { ENDPOINTS, SERVICES } from "../constants/strings";
import { THEME, useStyles } from "../constants/styles";
import { ClothingItemType } from "../constants/types";
import { useClothesTypeItems } from "../hooks/useClothingItems";
import { getNextType, getRecommendations } from "../hooks/useRecommende";
import { RootState } from "../store";
import { selectClothes } from "../store/slices/clothes-slice";
import { useClothingSelections } from "../hooks/useClothingSelections";
import { PantsIcon, ShirtIcon } from "../components/Icons";

const Home: FC = () => {
  const { isLoading: loadingItems } = useClothesTypeItems("");
  const {
    items,
    recommendations,
    selected,
    shoesCount,
    shirtsCount,
    pantsCount,
  } = useSelector((state: RootState) => state.clothes);
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { hasShoes, hasShirt, hasPants } = useClothingSelections(selected);

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
        <Box pb={4}>
          <Typography mb={2} variant='h4' color={THEME.secondary}>
            {SERVICES.STYLE_HACKER_TITLE}
          </Typography>
          <Grid container direction='row' spacing={2} mr={2} mt={2}>
            <Grid item>
              <Typography pb={2}>
                {SERVICES.AVAILABLE_SHOES}
                {loadingItems ? <CircularProgress size={12} /> : shoesCount}
              </Typography>
              <CustomButton
                isDisabled={hasShoes ? true : false}
                onClick={() =>
                  navigate(ENDPOINTS.SHOES, {
                    state: { recommendations },
                  })
                }
                startIcon={<ShoesIcon />}
                text={SERVICES.SELECT_SHOES}
              />
            </Grid>
            <Grid item>
              <Typography mb={2}>
                {SERVICES.AVAILABLE_SHIRTS}
                {loadingItems ? <CircularProgress size={12} /> : shirtsCount}
              </Typography>
              <CustomButton
                isDisabled={hasShirt ? true : false}
                onClick={() =>
                  navigate(ENDPOINTS.SHIRTS, {
                    state: { recommendations },
                  })
                }
                startIcon={<ShirtIcon />}
                text={SERVICES.SELECT_SHIRT}
              />
            </Grid>
            <Grid item>
              <Typography mb={2}>
                {SERVICES.AVAILABLE_PANTS}
                {loadingItems ? <CircularProgress size={12} /> : pantsCount}
              </Typography>
              <CustomButton
                isDisabled={hasPants ? true : false}
                onClick={() =>
                  navigate(ENDPOINTS.PANTS, {
                    state: { recommendations },
                  })
                }
                startIcon={<PantsIcon />}
                text={SERVICES.SELECT_PANTS}
              />
            </Grid>
            <Grid item xs />
            <CustomButton
              onClick={() => navigate(ENDPOINTS.SAVED_SETS)}
              startIcon={<SaveIcon />}
              text={SERVICES.SAVED_OUTFITS_TITLE}
              color={THEME.secondary}
              hover={THEME.secondary}
              isDisabled={undefined}
            />
          </Grid>
        </Box>

        {recommendations?.length ? (
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
