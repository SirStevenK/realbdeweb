import { SubscriberProps } from "@/types/utils";
import mongoose, { Document, Model, Schema } from "mongoose";
import Database from "../Database";

const SubscriberSchema = new Schema({
  email: String,
});

export type SUBSCRIBER_DOC = Document<mongoose.Types.ObjectId> &
  SubscriberProps;

class SubscriberQuery {
  private model: Model<SUBSCRIBER_DOC>;

  constructor() {
    this.model = Database.getDatabase().model<SUBSCRIBER_DOC>(
      "Subscriber",
      SubscriberSchema
    );
  }

  async getSubscriber(id: string): Promise<SubscriberProps | undefined> {
    const document = await this.model.findById(id).lean();

    if (document) return document;
    else return undefined;
  }

  async getSubscribers(): Promise<SubscriberProps[]> {
    const documents = await this.model.find().lean();

    if (documents) return documents;
    else return [];
  }

  async addSubscriber(subscriber: SubscriberProps): Promise<boolean> {
    const alreadyExists = Boolean(
      await this.model.findOne({ email: subscriber.email })
    );
    if (!alreadyExists) {
      const document = await this.model.create(subscriber);
      if (document) return true;
    }
    return true;
  }

  async deleteSubscriber(id: string): Promise<boolean> {
    const document = await this.model.findByIdAndDelete(id);

    if (document) return true;
    else return false;
  }
}

export default new SubscriberQuery();
