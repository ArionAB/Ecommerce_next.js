import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../src/Components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "../src/Store";
import RefreshToken from "../src/Components/refresh-token/RefreshToken";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <RefreshToken />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
