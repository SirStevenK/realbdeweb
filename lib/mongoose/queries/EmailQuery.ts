import { EmailProps } from "@/types/utils";
import mongoose, { Document, Model, Schema } from "mongoose";
import Database from "../Database";

const EmailSchema = new Schema({
  title: String,
  to: String,
  content: Object,
  date: String,
  sended: String,
});

export type EMAIL_DOC = Document<mongoose.Types.ObjectId> & EmailProps;

class EmailQuery {
  private model: Model<EMAIL_DOC>;

  constructor() {
    this.model = Database.getDatabase().model<EMAIL_DOC>("Email", EmailSchema);
  }

  async getEmail(id: string): Promise<EmailProps | undefined> {
    const document = await this.model.findById(id).lean();

    if (document) return document;
    else return undefined;
  }

  async getEmails(): Promise<EmailProps[]> {
    const documents = await this.model.find().lean();

    if (documents) return documents;
    else return [];
  }

  async addEmail(email: EmailProps): Promise<string | undefined> {
    const document = await this.model.create(email);

    if (document)
      return (document._id as mongoose.Types.ObjectId).toHexString();
    else return undefined;
  }

  async deleteEmail(id: string): Promise<boolean> {
    const document = await this.model.findByIdAndDelete(id);

    if (document) return true;
    else return false;
  }

  async updateEmail(email: EmailProps): Promise<boolean> {
    const document = await this.model.findByIdAndUpdate(email._id, {
      $set: {
        content: email.content,
        title: email.title,
        to: email.to,
      },
    });

    if (document) return true;
    else return false;
  }
}

export default new EmailQuery();
