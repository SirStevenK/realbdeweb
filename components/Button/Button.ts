import styled from "@emotion/styled";
import colors from "@/styles/colors.json";
import fontFamily from "@/styles/fontFamily.json";

const Button = styled.button(({ color }) => ({
  outline: "none!important",
  background: colors[color || "primary"],
  color: colors.light,
  fontFamily: fontFamily.display.join(","),
  fontWeight: "bold",
  textTransform: "uppercase",
  padding: "7px 15px",
  borderRadius: "5px",
  ".icon": {
    fontSize: "14px",
    marginLeft: "6px",
    marginRight: "2px",
  },
}));

export default Button;
