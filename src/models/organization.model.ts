import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const organizationSchema = new Schema({
	organization: {
		type: String,
		required: true,
		unique: true,
	},
	marketValue: { type: String },
	address: { type: String },
	ceo: { type: String, required: true },
	country: { type: String },
	employees: [{ type: String }],
	products: [{ type: String }],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const Organization = mongoose.model<auth>("Organization", organizationSchema);

interface auth extends mongoose.Document {
	organization: string;
	id: number;
}
export default Organization;
