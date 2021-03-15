export type MainContentProps = {
  introduction: string;
  events: CalendarElementProps[];
  testimonials: TestomonialElementProps[];
  questions: QuestionElementProps[];
};

export type CalendarElementProps = {
  color: string;
  date: string;
  name: string;
};

export type TestomonialElementProps = {
  content: string;
  description: string;
  firstname: string;
  lastname: string;
};

export type QuestionElementProps = {
  question: string;
  answer: string;
};

export type NavChoiceProps = {
  type: "link" | "scroll" | "function";
  label: string;
  value: string;
  displayBottom?: boolean;
};
