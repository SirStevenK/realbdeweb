import { Mongoose } from "mongoose";
export const MongoConnection = new Mongoose();
const mongoConnectString = process.env.MONGO_URL;
MongoConnection.connect(mongoConnectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
