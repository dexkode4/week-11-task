import mongoose from "mongoose";
interface auth extends mongoose.Document {
    username: string;
    email: string;
    password: string;
}
declare const User: mongoose.Model<auth, {}>;
export default User;
