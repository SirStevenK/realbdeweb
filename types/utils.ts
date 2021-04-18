export type MainContentProps = {
  introduction: string;
  events: CalendarElementProps[];
  testimonials: TestomonialElementProps[];
  questions: QuestionElementProps[];
};

export type TextProps = {
  type: string;
  content: string;
};

export type CalendarElementProps = {
  _id?: string;
  date: string;
  name: string;
};

export type TestomonialElementProps = {
  _id?: string;
  content: string;
  description: string;
  firstname: string;
  lastname: string;
};

export type QuestionElementProps = {
  _id?: string;
  question: string;
  answer: string;
};

export type AdministratorElementProps = {
  _id?: string;
  email: string;
};

export type NavChoiceProps = {
  type: "link" | "scroll" | "function";
  label: string;
  value: string;
  displayBottom?: boolean;
};

export type SaveProps = {
  date: string;
  message: string;
  content: unknown;
};
