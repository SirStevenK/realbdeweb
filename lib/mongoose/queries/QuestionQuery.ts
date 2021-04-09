import { MongoConnection } from "@/lib/mongoose/MongoConnection";
import { QuestionElementProps } from "@/types/utils";
import { Document, Model } from "mongoose";
import Database from "../Database";
const Schema = MongoConnection.Schema;

const QuestionSchema = new Schema({
  question: String,
  answer: String,
});

export type QUESTION_DOC = Document<string> & QuestionElementProps;

class QuestionQuery {
  private model: Model<QUESTION_DOC>;

  constructor() {
    this.model = Database.getDatabase().model<QUESTION_DOC>(
      "Question",
      QuestionSchema
    );
  }

  async getQuestion(id: string): Promise<QuestionElementProps | undefined> {
    const document = await this.model.findById(id).lean();

    if (document) return document;
    else return undefined;
  }

  async getQuestions(): Promise<QuestionElementProps[]> {
    const documents = await this.model.find().lean();

    if (documents) return documents;
    else return [];
  }

  async addQuestion(question: QuestionElementProps): Promise<boolean> {
    const document = await this.model.create(question);

    if (document) return true;
    else return false;
  }

  async deleteQuestion(id: string): Promise<boolean> {
    const document = await this.model.findByIdAndDelete(id);

    if (document) return true;
    else return false;
  }

  async updateQuestion(question: QuestionElementProps): Promise<boolean> {
    const document = await this.model.findByIdAndUpdate(question._id, {
      question: question.question,
      answer: question.answer,
    });

    if (document) return true;
    else return false;
  }
}

export default new QuestionQuery();
