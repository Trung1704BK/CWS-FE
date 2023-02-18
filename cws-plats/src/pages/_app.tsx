import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultLayout } from "../components/common/Layout";
import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { rootStore } from "../store/store";
import { Toaster } from "react-hot-toast";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import AuthenticationProvider from "../store/AuthenticationProvider";
import { queryClient } from "../core/queryClient";
import { Inter } from "@next/font/google";
import { Spinner } from "@/components/common";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/styles/AppDatePicker.css";
// import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { LightBoxProvider } from "@/store/lightBox";
import Center from "@/components/common/Center/Center";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/core/utils/theme";

const inter = Inter({
  subsets: ["vietnamese", "latin"],
});
const persistor = persistStore(rootStore);

interface AppPropsWithLayout extends AppProps {
  Component: AppProps["Component"] & {
    layout?: React.ComponentType;
    title?: string;
  };
}

const MyApp = ({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout) => {
  const Layout = Component.layout || DefaultLayout;
  const title = `${Component.title || "Default Page"} | Plats Network`;

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Provider store={rootStore}>
          <PersistGate
            loading={
              <Center>
                <Spinner />
              </Center>
            }
            persistor={persistor}
          >
            <AuthenticationProvider>
              <LightBoxProvider>
                <div className={inter.className}>
                  <Head>
                    <title>{title}</title>
                  </Head>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                  <Toaster />
                </div>
              </LightBoxProvider>
            </AuthenticationProvider>
          </PersistGate>
        </Provider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default MyApp;
