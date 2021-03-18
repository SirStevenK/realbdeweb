import styled from "@emotion/styled";
import colors from "@/styles/colors.json";
import fontFamily from "@/styles/fontFamily.json";

const InputText = styled.input({
  background: colors.white,
  border: `3px solid ${colors.gray}`,
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
});

export default InputText;
