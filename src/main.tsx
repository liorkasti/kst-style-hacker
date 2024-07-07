import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { queryClient } from "./react-query";
import { persistor, store } from "./store";
import { ThemeProvider } from "@mui/material";
import theme from "./constants/styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <App />
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
