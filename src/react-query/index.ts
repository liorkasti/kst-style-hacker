import { QueryClient } from "@tanstack/react-query";
import { createStandaloneToast } from "@chakra-ui/react";
import { SAVED_SETS } from "./query-keys";

export const toast = createStandaloneToast();

const queryErrorHandler = (error: unknown): void => {
  const title =
    error instanceof Error ? error.message : "error connecting to server";

  alert({ title, status: "error", variant: "subtle", isClosable: true });
};

const generateQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000, // 10 minutes
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        onError: queryErrorHandler,
      },
    },
  });
};

export const queryClient = generateQueryClient();

export const getSavedSets = () => {
  return queryClient.getQueryData([SAVED_SETS]) || [];
};
