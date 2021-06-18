import colors from "@/styles/colors.json";
import fontFamily from "@/styles/fontFamily.json";
import styled from "@emotion/styled";

const Button = styled.button(({ color, hidden }) => ({
  display: hidden ? "none" : "flex",
  margin: "0 auto",
  alignItems: "center",
  outline: "none!important",
  background: colors[color || "primary"],
  color: colors.light,
  fontFamily: fontFamily.display.join(","),
  fontWeight: "bold",
  textTransform: "uppercase",
  padding: "7px 15px",
  borderRadius: "5px",
  svg: {
    fontSize: "14px",
    marginLeft: "6px",
    marginRight: "2px",
  },
}));

export default Button;
