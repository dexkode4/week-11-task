import supertest from "supertest";
import app from "../app";
import organizationModel from "../models/organization.model";
import mongoose from "mongoose";

const request = supertest(app);
const BASE_URL = "/gql";

afterAll(() => {
	// Closing the DB connection allows Jest to exit successfully.
	mongoose.disconnect();
});

let length = 0;
describe("Test for queries and mutation", () => {
	beforeAll(async () => {
		length = await organizationModel.countDocuments().exec();
	});

	it("Get all organizations", done => {
		request
			.post(BASE_URL)
			.send({
				query: "{organizations{organization, _id}}",
			})
			.set("Accept", "Application/json")
			.expect("Content-Type", /json/)
			.end(function (err, res) {
				if (err) return done(err);

				expect(res.body).toBeInstanceOf(Object);
				expect(res.body.data.organizations.length).toEqual(length);
				done();
			});
	});

	it("Get organizations by id", done => {
		request
			.post(BASE_URL)
			.send({
				query:
					'{ organization(_id:"5f7337c9a8548659bb0b1b89") { organization, ceo, marketValue} }',
			})
			.expect(200)
			.end((err, res) => {
				// res will contain array with one organization
				if (err) return done(err);
				expect(res.body.data.organization).toHaveProperty("organization");
				expect(res.body.data.organization).toHaveProperty("ceo");
				expect(res.body.data.organization).toHaveProperty("marketValue");
				done();
			});
	});

	it("Creates organizations", done => {
		request
			.post(BASE_URL)
			.send({
				query:
					'mutation { createOrganization (organization: "myOrg",marketValue: "50%",ceo: "ceo-name",address: "address is address",employees:["employee1","employee2"],products:["product1","product2"]){organization}}',
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.body.data.createOrganization).toHaveProperty("organization");
				done();
			});
	});

	it("Deletes organizations", done => {
		request
			.post(BASE_URL)
			.send({
				query:
					'mutation { deleteOrganization (organization:"myOrg") { organization} }',
			})
			.expect(200)
			.end((err, res) => {
				// res will contain array with one organization
				if (err) return done(err);
				expect(res.body.data.deleteOrganization).toHaveProperty("organization");
				done();
			});
	});

	it("Updates organizations", done => {
		request
			.post(BASE_URL)
			.send({
				query:
					'mutation { updateOrganization (_id:"5f7337c9a8548659bb0b1b89", organization:"new name", marketValue:"100%") { _id , organization} }',
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.body.data.updateOrganization).toHaveProperty("organization");
				done();
			});
	});
});
