import { ContactProps } from "@/types/utils";
import mongoose, { Document, Model, Schema } from "mongoose";
import Database from "../Database";

const ContactSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

export type CONTACT_DOC = Document<mongoose.Types.ObjectId> & ContactProps;

class ContactQuery {
  private model: Model<CONTACT_DOC>;

  constructor() {
    this.model = Database.getDatabase().model<CONTACT_DOC>(
      "Contact",
      ContactSchema
    );
  }

  async getContact(id: string): Promise<ContactProps | undefined> {
    const document = await this.model.findById(id).lean();

    if (document) return document;
    else return undefined;
  }

  async getContacts(): Promise<ContactProps[]> {
    const documents = await this.model.find().lean();

    if (documents) return documents;
    else return [];
  }

  async addContact(contact: ContactProps): Promise<string | undefined> {
    const document = await this.model.create(contact);

    if (document)
      return (document._id as mongoose.Types.ObjectId).toHexString();
    else return undefined;
  }

  async deleteContact(id: string): Promise<boolean> {
    const document = await this.model.findByIdAndDelete(id);

    if (document) return true;
    else return false;
  }
}

export default new ContactQuery();
