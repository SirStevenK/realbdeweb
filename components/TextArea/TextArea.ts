import styled from "@emotion/styled";
import colors from "@/styles/colors.json";
import fontFamily from "@/styles/fontFamily.json";

const TextArea = styled.textarea({
  background: colors.white,
  border: `3px solid ${colors.gray}`,
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
});

export default TextArea;
