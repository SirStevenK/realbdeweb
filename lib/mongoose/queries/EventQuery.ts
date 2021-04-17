import { CalendarElementProps } from "@/types/utils";
import { Document, Model, Schema } from "mongoose";
import Database from "../Database";

const EventSchema = new Schema({
  date: String,
  name: String,
});

export type EVENT_DOC = Document<string> & CalendarElementProps;

class QuestionQuery {
  private model: Model<EVENT_DOC>;

  constructor() {
    this.model = Database.getDatabase().model<EVENT_DOC>("Event", EventSchema);
  }

  async getEvent(id: string): Promise<CalendarElementProps | undefined> {
    const document = await this.model.findById(id).lean();

    if (document) return document;
    else return undefined;
  }

  async getEvents(): Promise<CalendarElementProps[]> {
    const documents = await this.model.find().lean();

    if (documents) return documents;
    else return [];
  }

  async addEvent(event: CalendarElementProps): Promise<boolean> {
    const document = await this.model.create(event);

    if (document) return true;
    else return false;
  }

  async deleteEvent(id: string): Promise<boolean> {
    const document = await this.model.findByIdAndDelete(id);

    if (document) return true;
    else return false;
  }

  async updateEvent(event: CalendarElementProps): Promise<boolean> {
    const document = await this.model.findByIdAndUpdate(event._id, {
      date: event.date,
      name: event.name,
    });

    if (document) return true;
    else return false;
  }
}

export default new QuestionQuery();
