import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { reducers } from "../reducers";
import { configureStore } from "@reduxjs/toolkit";
import "animate.css";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";
import AOS from "aos";
import "aos/dist/aos.css";

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});

const NavBarContent = dynamic(() => import("../components/NavBar/NavBar"));
const FooterContent = dynamic(() => import("../components/Footer/Footer"));

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      offset: 100,
      delay: 4000,
    });
  }, []);
  return (
    <>
      <NextNProgress
        color="green"
        height={6}
        // transformCSS={(css: string) => <PageLoading css={css} />}
      />
      <Provider store={store}>
        <div className="min-h-screen bg-gray-100">
          <NavBarContent />
          <div className="mt-2" style={{ minHeight: "calc(100vh - 250px)" }}>
            <Component {...pageProps} />
          </div>
          <FooterContent />
        </div>
      </Provider>
    </>
  );
};

export default App;
