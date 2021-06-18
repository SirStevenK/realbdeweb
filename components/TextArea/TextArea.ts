import colors from "@/styles/colors.json";
import fontFamily from "@/styles/fontFamily.json";
import styled from "@emotion/styled";

type Props = {
  colorBorder?: string;
};

const TextArea = styled.textarea<Props>(({ colorBorder = colors.gray }) => ({
  background: colors.white,
  border: `3px solid ${colorBorder}`,
  borderRadius: "0.5rem",
  color: colors.dark,
  display: "block",
  fontFamily: fontFamily.body.join(","),
  height: "180px",
  padding: "3px 5px",
  resize: "none",
  outline: "none",
  "::placeholder": {
    color: colors.gray,
  },
  ":focus": {
    border: `3px solid ${colors.primary}CC`,
  },
}));

export default TextArea;
