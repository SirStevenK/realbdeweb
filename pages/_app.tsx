import "tailwindcss/tailwind.css";
import ThemeProvider from "@/providers/ThemeProvider";
import { AppProps } from "next/app";

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      {/* <GoogleFonts href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&family=Rubik:wght@400;700&display=swap" /> */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default CustomApp;
