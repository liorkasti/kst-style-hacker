import { Box } from "@mui/material";
import { FC, Suspense, lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { SCREEN_NAMES } from "./constants/strings";

const ClothesList = lazy(() => import("./pages/ClothesList"));
const Home = lazy(() => import("./pages/Home"));
const SavedOutfits = lazy(() => import("./pages/SavedOutfits"));

const Layout = ({
  title,
  showBackButton,
}: {
  title: string;
  showBackButton: boolean;
}) => (
  <>
    <Header title={title} showBackButton={showBackButton} />
    <Box sx={{ paddingTop: "80px" }}>
      <Outlet />
    </Box>
  </>
);

const App: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path='/'
          element={<Layout title={SCREEN_NAMES.HOME} showBackButton={false} />}>
          <Route index element={<Home />} />
        </Route>
        <Route
          path='/clothing-list'
          element={
            <Layout title={SCREEN_NAMES.CLOTHING_LIST} showBackButton={true} />
          }>
          <Route index element={<ClothesList />} />
        </Route>
        <Route
          path='/saved-sets'
          element={
            <Layout title={SCREEN_NAMES.SAVED_SETS} showBackButton={true} />
          }>
          <Route index element={<SavedOutfits />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
