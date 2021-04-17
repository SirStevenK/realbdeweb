import ThemeProvider from "@/providers/ThemeProvider";
import "@/styles/index.css";
import { AppProps } from "next/app";

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default CustomApp;
