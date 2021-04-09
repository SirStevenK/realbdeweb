import { MongoConnection } from "@/lib/mongoose/MongoConnection";
import { TextProps } from "@/types/utils";
import { Document, Model } from "mongoose";
import Database from "../Database";
const Schema = MongoConnection.Schema;

const TextSchema = new Schema({
  type: String,
  content: String,
});

export type TEXT_DOC = Document<string> & TextProps;

class TextQuery {
  private model: Model<TEXT_DOC>;

  constructor() {
    this.model = Database.getDatabase().model<TEXT_DOC>("Text", TextSchema);
  }

  async getIntoduction(): Promise<string> {
    const document = await this.model
      .findOne({ type: "introduction" }, "content")
      .lean();

    if (document) return document.content;
    else return "";
  }

  async updateIntroduction(value: string): Promise<boolean> {
    const document = await this.model.updateOne(
      { type: "introduction" },
      { $set: { content: value } }
    );

    if (document) return true;
    else return false;
  }
}

export default new TextQuery();
