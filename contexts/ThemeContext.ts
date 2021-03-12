import { createContext } from "react";

type ThemeContextProps = {
  darkTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps>({
  darkTheme: false,
  toggleTheme: () => null,
});

export default ThemeContext;
