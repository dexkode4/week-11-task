import mongoose from "mongoose";
interface auth extends mongoose.Document {
    email: string;
    password: string;
    register: any;
}
declare const User: mongoose.Model<auth, {}>;
export default User;
