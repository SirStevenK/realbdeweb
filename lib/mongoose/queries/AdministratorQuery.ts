import { AdministratorElementProps } from "@/types/utils";
import { Document, Model, Schema } from "mongoose";
import Database from "../Database";

const AdministratorSchema = new Schema({
  email: String,
});

export type ADMINISTRATOR_DOC = Document<string> & AdministratorElementProps;

class AdministratorQuery {
  private model: Model<ADMINISTRATOR_DOC>;

  constructor() {
    this.model = Database.getDatabase().model<ADMINISTRATOR_DOC>(
      "Administrator",
      AdministratorSchema
    );
  }

  async getAdministrator(
    id: string
  ): Promise<AdministratorElementProps | undefined> {
    const document = await this.model.findById(id).lean();

    if (document) return document;
    else return undefined;
  }

  async getAdministrators(): Promise<AdministratorElementProps[]> {
    const documents = await this.model.find().lean();

    if (documents) return documents;
    else return [];
  }

  async addAdministrator(
    administrator: AdministratorElementProps
  ): Promise<boolean> {
    const document = await this.model.create(administrator);

    if (document) return true;
    else return false;
  }

  async deleteAdministrator(id: string): Promise<boolean> {
    const document = await this.model.findByIdAndDelete(id);

    if (document) return true;
    else return false;
  }

  async findAdministrator(
    filter: Partial<AdministratorElementProps>
  ): Promise<AdministratorElementProps | undefined> {
    const document = await this.model.findOne(filter).lean();

    if (document) return document;
    else return undefined;
  }

  async findAdministrators(
    filter: Partial<AdministratorElementProps>
  ): Promise<AdministratorElementProps[]> {
    const documents = await this.model.find(filter).lean();

    if (documents) return documents;
    else return [];
  }
}

export default new AdministratorQuery();
