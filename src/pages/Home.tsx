import ShoesIcon from "@mui/icons-material/RollerSkating";
import SaveIcon from "@mui/icons-material/Save";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClothingItem from "../components/ClothingItem";
import CustomButton from "../components/CustomButton";
import { PantsIcon, ShirtIcon } from "../components/Icons";
import SaveSetDialog from "../components/SaveSetDialog";
import { ENDPOINTS, SERVICES } from "../constants/strings";
import { THEME, useStyles } from "../constants/styles";
import { ClothingItemType } from "../constants/types";
import { useClothesTypeItems } from "../hooks/useClothingItems";
import { useClothingSelections } from "../hooks/useClothingSelections";
import { useOutfitEffect } from "../hooks/useOutfitEffect";
import { RootState } from "../store";
import { selectClothes, setItem } from "../store/slices/clothes-slice";

const Home: FC = () => {
  const { isLoading: loadingItems } = useClothesTypeItems("");
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const {
    item,
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

  const nextItem = "";

  useOutfitEffect(
    selected,
    hasShoes,
    hasShirt,
    hasPants,
    items,
    setShowDialog,
    item,
    nextItem
  );

  // useEffect(() => {
  //   if (hasShoes && hasShirt && hasPants) {
  //     setShowDialog(true);
  //     console.log({});

  //     const outfit: OutfitProps = {
  //       id: new Date().toISOString(),
  //       items: selected,
  //       creationDate: new Date().toLocaleDateString(),
  //       creationTime: new Date().toLocaleTimeString(),
  //     };
  //     dispatch(addToOutfit(outfit));
  //     dispatch(clearSelection());
  //   }
  //   if (item) {
  //     const updatedRecommendations: ClothingItemType[] = getRecommendations(
  //       item,
  //       items
  //     );
  //     console.log({
  //       item,
  //       updatedRecommendations,
  //       hasShoes,
  //       hasShirt,
  //       hasPants,
  //     });

  //     dispatch(setRecommendations(updatedRecommendations));
  //   }
  // }, [dispatch, selected, hasShoes, hasShirt, hasPants, item]);

  const handleSelectItem = (item: ClothingItemType) => {
    dispatch(setItem(item));
    dispatch(selectClothes(item));
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
                startIcon={<ShirtIcon hasShirt={false} />}
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
                startIcon={<PantsIcon hasPants={false} />}
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
              {SERVICES.RECOMMENDATIONS}
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
      <SaveSetDialog showDialog={showDialog} setShowDialog={setShowDialog} />
    </Box>
  );
};

export default Home;
