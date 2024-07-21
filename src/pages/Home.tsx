import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../constants/strings";
import { useClothesTypeItems } from "../hooks/useClothingItems";
import { RootState } from "../store";

const Home: FC = () => {
  const { isLoading: loadingItems } = useClothesTypeItems("");
  const { shoesCount, shirtsCount, pantsCount } = useSelector(
    (state: RootState) => state.clothes
  );
  const navigate = useNavigate();
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

        <Grid container direction='column' spacing={2} mt={2}>
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
    </Box>
  );
};

export default Home;
