import { TestomonialElementProps } from "@/types/utils";
import mongoose, { Document, Model, Schema } from "mongoose";
import Database from "../Database";

const TestimonialSchema = new Schema({
  content: String,
  description: String,
  image: String,
  firstname: String,
  lastname: String,
});

export type TESTIMONIAL_DOC = Document<mongoose.Types.ObjectId> &
  TestomonialElementProps;

class TestimonialQuery {
  private model: Model<TESTIMONIAL_DOC>;

  constructor() {
    this.model = Database.getDatabase().model<TESTIMONIAL_DOC>(
      "Testimonial",
      TestimonialSchema
    );
  }

  async getTestimonial(
    id: string
  ): Promise<TestomonialElementProps | undefined> {
    const document = await this.model.findById(id).lean();

    if (document) return document;
    else return undefined;
  }

  async getTestimonials(): Promise<TestomonialElementProps[]> {
    const documents = await this.model.find().lean();

    if (documents) return documents;
    else return [];
  }

  async addTestimonial(testimonial: TestomonialElementProps): Promise<boolean> {
    const document = await this.model.create(testimonial);

    if (document) return true;
    else return false;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const document = await this.model.findByIdAndDelete(id);

    if (document) return true;
    else return false;
  }

  async updateTestimonial(
    testimonial: TestomonialElementProps
  ): Promise<boolean> {
    const document = await this.model.findByIdAndUpdate(testimonial._id, {
      content: testimonial.content,
      description: testimonial.description,
      image: testimonial.image,
      firstname: testimonial.firstname,
      lastname: testimonial.lastname,
    });

    if (document) return true;
    else return false;
  }
}

export default new TestimonialQuery();
