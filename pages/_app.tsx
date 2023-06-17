import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../src/Components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "../src/Store";
import RefreshToken from "../src/Components/refresh-token/RefreshToken";
import Script from "next/script";
import AppSnackbar from "../src/Components/notifications/AppSnackbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <RefreshToken />
        <AppSnackbar />
        {/* <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-YLJM30LNM2"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`  window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-YLJM30LNM2');`}
        </Script> */}

        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
