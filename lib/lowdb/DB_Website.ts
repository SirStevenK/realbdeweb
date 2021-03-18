import {
  CalendarElementProps,
  MainContentProps,
  QuestionElementProps,
  TestomonialElementProps,
} from "@/types/utils";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import shortid from "shortid";

class Database {
  db: lowdb.LowdbSync<MainContentProps>;

  constructor() {
    this.db = lowdb<lowdb.AdapterSync>(new FileSync("db.json"));
    this.db
      .defaults({
        introduction: "",
        events: [],
        testimonials: [],
        questions: [],
      })
      .write();
  }

  getIntroduction() {
    return this.db.get("introduction").value();
  }

  updateIntroduction(value: string) {
    return this.db.set("introduction", value).write();
  }

  getEvent(id: string): CalendarElementProps | undefined {
    return this.db.get("events").find({ id }).value();
  }

  getEvents() {
    return this.db.get("events").value();
  }

  addEvent(event: Omit<CalendarElementProps, "id">) {
    let id = shortid.generate();
    while (this.getEvent(id)) id = shortid.generate();

    return this.db
      .get("events")
      .push({ id, date: event.date, name: event.name })
      .write();
  }

  deleteEvent(id: string) {
    return this.db.get("events").remove({ id }).write();
  }

  updateEvent(event: CalendarElementProps) {
    return this.db
      .get("events")
      .find({ id: event.id })
      .assign({ date: event.date, name: event.name })
      .write();
  }

  getQuestion(id: string): QuestionElementProps | undefined {
    return this.db.get("questions").find({ id }).value();
  }

  getQuestions() {
    return this.db.get("questions").value();
  }

  addQuestion(question: Omit<QuestionElementProps, "id">) {
    let id = shortid.generate();
    while (this.getEvent(id)) id = shortid.generate();

    return this.db
      .get("questions")
      .push({ id, answer: question.answer, question: question.question })
      .write();
  }

  deleteQuestion(id: string) {
    return this.db.get("questions").remove({ id }).write();
  }

  updateQuestion(question: QuestionElementProps) {
    return this.db
      .get("questions")
      .find({ id: question.id })
      .assign({ answer: question.answer, question: question.question })
      .write();
  }

  getTestimonial(id: string): TestomonialElementProps | undefined {
    return this.db.get("testimonials").find({ id }).value();
  }

  getTestimonials() {
    return this.db.get("testimonials").value();
  }

  addTestimonial(testimonial: Omit<TestomonialElementProps, "id">) {
    let id = shortid.generate();
    while (this.getEvent(id)) id = shortid.generate();

    return this.db
      .get("testimonials")
      .push({
        id,
        content: testimonial.content,
        description: testimonial.description,
        firstname: testimonial.firstname,
        lastname: testimonial.lastname,
      })
      .write();
  }

  deleteTestimonial(id: string) {
    return this.db.get("testimonials").remove({ id }).write();
  }

  updateTestimonial(testimonial: TestomonialElementProps) {
    return this.db
      .get("testimonials")
      .find({ id: testimonial.id })
      .assign({
        content: testimonial.content,
        description: testimonial.description,
        firstname: testimonial.firstname,
        lastname: testimonial.lastname,
      })
      .write();
  }
}

export default new Database();
