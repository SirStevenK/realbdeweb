import { Minus, Plus } from "@/components/icons";
import colors from "@/styles/colors.json";
import styled from "@emotion/styled";
import { useState } from "react";

const WrapperRow = styled.div({
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "10px",
  paddingBottom: "12px",
  background: colors.light,
  // border: `2px solid ${colors["dark"]}`,
  borderRadius: "5px",
  maxWidth: "680px",
  width: "100%",
});

type Props = {
  question: string;
  answer: string;
};

const RowQuestion: React.FC<Props> = ({ answer, question }) => {
  const [opened, setOpened] = useState(false);
  return (
    <WrapperRow>
      <div className="flex justify-between items-center">
        <span
          className={`text-${
            opened ? "dark" : "dark"
          } font-display md:text-lg font-bold pr-8`}
        >
          {question}
        </span>
        {opened ? (
          <Minus
            className="cursor-pointer text-primary select-none"
            onClick={() => setOpened(() => false)}
          />
        ) : (
          <Plus
            className="cursor-pointer text-primary select-none"
            onClick={() => setOpened(() => true)}
          />
        )}
      </div>
      <div
        className={`text-dark text-sm md:text-base font-body pt-1 pr-8 md:pr-10 ${
          opened ? "block" : "hidden"
        }`}
      >
        {answer}
      </div>
    </WrapperRow>
  );
};

export default RowQuestion;
