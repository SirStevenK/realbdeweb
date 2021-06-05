import { QuestionElementProps } from "@/types/utils";
import RowQuestion from "./RowQuestion";

type Props = {
  listQuestions: QuestionElementProps[];
};

const FAQ: React.FC<Props> = ({ listQuestions }) => {
  return (
    <div id="faq" className="justify-between items-center">
      <h2 className="font-display font-bold text-2xl text-primary text-center">
        FAQ
      </h2>
      <div className="flex flex-col items-center space-y-1 px-2 pb-1 mt-4 space-y-3">
        {listQuestions.map(({ answer, question }, index) => (
          <RowQuestion
            key={question + index}
            answer={answer}
            question={question}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
