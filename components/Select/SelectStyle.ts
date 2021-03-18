import colors from "@/styles/colors.json";
import fontFamily from "@/styles/fontFamily.json";
import { GroupTypeBase, Styles } from "react-select";

const styles: Partial<
  Styles<
    {
      label: string;
      value: string;
    },
    false,
    GroupTypeBase<{
      label: string;
      value: string;
    }>
  >
> = {
  control: (provided) => ({
    ...provided,
    border: `3px solid ${colors.gray}`,
    borderRadius: "0.5rem",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: fontFamily.display.join(","),
  }),
  option: (provided) => ({
    ...provided,
    fontFamily: fontFamily.display.join(","),
  }),
};

export default styles;
