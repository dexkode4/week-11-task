import organizationModel from "../models/organization.model";
import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";

const organizationSchema = Joi.object().keys({
	organization: Joi.string().required(),
	marketValue: Joi.string(),
	address: Joi.string(),
	ceo: Joi.string().required(),
	country: Joi.string(),
	employees: Joi.array().items(Joi.string()),
	products: Joi.array().items(Joi.string()),
});

type id = {
	_id: string;
};

type organization = {
	organization: string;
	marketValue: string;
	address: string;
	ceo: string;
	country: string;
	employees: Array<string>;
	products: Array<string>;
	_id: string;
};

export const organizations = ({
	first,
	limit,
}: {
	first: number;
	limit: number;
}) => {
	return organizationModel.find().limit(limit).skip(first).exec();
};

export const organization = async ({ _id }: id) => {
	const result = await organizationModel.find({ _id }).exec();
	return result[0];
};

export function createOrganization({
	organization,
	marketValue,
	ceo,
	address,
	employees,
	products,
}: organization) {
	const { value, error } = organizationSchema.validate(arguments[0]);
	const valid = error == null;
	console.log("createOrganization() >>>>");
	if (!valid) {
		console.log("invalid data");
		return { error: error };
	}
	// console.log(arguments[0]);
	const new_organization = new organizationModel(arguments[0]);
	console.log(new_organization);

	return new_organization.save();
}

export const deleteOrganization = ({ _id }: id) => {
	return organizationModel.findOneAndDelete({ _id });
};

export async function updateOrganization({
	_id,
	organization,
	marketValue,
	ceo,
	address,
	employees,
	products,
}: organization) {
	const updatedData = await organizationModel.findOneAndUpdate(
		{ _id },
		{ organization, marketValue, ceo, address, employees, products }
	);
	return updatedData;
}

export const register = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	password = await bcrypt.hash(password, 10);
	const new_user = new userModel({ email, password });
	return new_user.save();
};

export const login = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const user = await userModel.findOne({ email });
	if (!user) {
		throw new Error("No user with that email").message;
	}

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) {
		throw new Error("Incorrect password").message;
	}
	const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
		expiresIn: "24h",
	});

	return token;
};
