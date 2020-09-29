import supertest from "supertest";
import app from "../app";
import organizationModel from "../models/organization.model";
import mongoose from "mongoose";

const request = supertest(app);
const BASE_URL = "/gql";

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
					'{ organization(_id:"5f7333f21df58658f848fe12") { organization, ceo, marketValue} }',
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

	// it("Creates organizations", done => {
	// 	request
	// 		.post(BASE_URL)
	// 		.send({
	// 			query:
	// 				'mutation { createOrganization (organization: "new org",marketValue: "50%",ceo: "ceo-name",address: "address is address",employees:["employee1","employee2"],products:["product1","product2"]){organization}}',
	// 		})
	// 		.expect(200)
	// 		.end((err, res) => {
	// 			if (err) return done(err);
	// 			expect(res.body.data.createOrganization).toHaveProperty("organization");
	// 			done();
	// 		});
	// });

	// it("Deletes organizations", done => {
	// 	request
	// 		.post(BASE_URL)
	// 		.send({
	// 			query:
	// 				'mutation { deleteOrganization (_id:"5f71abbd5936151c29e9419c") {_id} }',
	// 		})
	// 		.expect(200)
	// 		.end((err, res) => {
	// 			// res will contain array with one organization
	// 			if (err) return done(err);
	// 			expect(res.body.data.deleteOrganization).toBe(null);
	// 			done();
	// 		});
	// });

	it("Updates organizations", done => {
		request
			.post(BASE_URL)
			.send({
				query:
					'mutation { updateOrganization (_id:"5f7333f21df58658f848fe12", organization:"demo-org", marketValue:"100%") { _id , organization} }',
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.body.data.updateOrganization).toHaveProperty("organization");
				done();
			});
	});

	afterAll(done => {
		// Closing the DB connection allows Jest to exit successfully.
		mongoose.connection.close();
		done();
	});
});
