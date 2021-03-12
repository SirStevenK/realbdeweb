import ThemeContext from "@/contexts/ThemeContext";
import { useState } from "react";

const setHTMLTagClass = (darkTheme: boolean) => {
  if (darkTheme) document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
};

const ThemeProvider: React.FC = ({ children }) => {
  let defaultValue: boolean;
  if (process.browser) {
    if (localStorage.getItem("theme") === "dark") defaultValue = true;
    else if (localStorage.getItem("theme") === "light") defaultValue = false;
    else
      defaultValue = window.matchMedia("(prefers-color-scheme: dark)").matches;
  } else defaultValue = false;
  const [darkTheme, setDarkTheme] = useState(defaultValue);

  if (process.browser) setHTMLTagClass(darkTheme);

  const toggleTheme = () => {
    setDarkTheme((prevValue) => {
      const newValue = !prevValue;
      localStorage.setItem("theme", newValue ? "dark" : "light");
      setHTMLTagClass(newValue);
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        darkTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
