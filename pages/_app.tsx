import ThemeProvider from "@/providers/ThemeProvider";
import { wrapper } from "@/store";
import "@/styles/index.css";
import { AppProps } from "next/app";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(CustomApp);
