import mongoose from "mongoose";

interface auth extends mongoose.Document {
	email: string;
	password: string;
	register: any;
}
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

const User = mongoose.model<auth>("Users", userSchema);

export default User;
