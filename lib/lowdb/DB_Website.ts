import { MainContentProps } from "@/types/utils";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

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

  setIntroduction(value: string) {
    return this.db.set("introduction", value).write();
  }

  getEvents() {
    return this.db.get("events").value();
  }

  getQuestions() {
    return this.db.get("questions").value();
  }

  getTestimonials() {
    return this.db.get("testimonials").value();
  }
}

export default new Database();
