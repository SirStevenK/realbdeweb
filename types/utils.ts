import { OutputData } from "@editorjs/editorjs";

export type NavChoiceProps = {
  type: "link" | "scroll" | "function";
  label: string;
  value: string;
  displayBottom?: boolean;
};

export type MainContentProps = {
  introduction: string;
  events: CalendarElementProps[];
  testimonials: TestomonialElementProps[];
  questions: QuestionElementProps[];
};

export type TextProps = {
  _id?: string;
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

export type EmailProps = {
  _id?: string;
  title: string;
  to: string;
  content: OutputData;
  sended?: string;
};

export type SaveProps = {
  _id?: string;
  date: string;
  message: string;
  content: unknown;
};

export type ContactProps = {
  _id?: string;
  date: string;
  name: string;
  email: string;
  message: string;
};

export type SubscriberProps = {
  _id?: string;
  date: string;
  email: string;
};
