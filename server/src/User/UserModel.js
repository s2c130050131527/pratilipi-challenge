import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  gid: String,
  name: String,
  picture: String,
  email: String,
});

const UserModel = model("User", UserSchema);

export default UserModel;
