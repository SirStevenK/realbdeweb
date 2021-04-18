import { Mongoose } from "mongoose";

const mongoConnectString = process.env.MONGO_URL;

class Database {
  private db: Mongoose;

  constructor() {
    this.db = new Mongoose();
    this.db.connect(mongoConnectString as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }

  getDatabase() {
    return this.db;
  }
}

export default new Database();
