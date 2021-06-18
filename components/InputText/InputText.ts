import colors from "@/styles/colors.json";
import fontFamily from "@/styles/fontFamily.json";
import styled from "@emotion/styled";

type Props = {
  colorBorder?: string;
};

const InputText = styled.input<Props>(({ colorBorder = colors.gray }) => ({
  background: colors.white,
  border: `3px solid ${colorBorder}`,
  borderRadius: "0.5rem",
  color: colors.dark,
  fontFamily: fontFamily.display.join(","),
  padding: "6px 5px",
  outline: "none",
  "::placeholder": {
    color: colors.gray,
  },
  ":focus": {
    border: `3px solid ${colors.primary}CC`,
  },
}));

export default InputText;
