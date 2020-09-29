"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var organization_model_1 = __importDefault(require("../models/organization.model"));
var mongoose_1 = __importDefault(require("mongoose"));
var request = supertest_1.default(app_1.default);
var BASE_URL = "/gql";
afterAll(function () {
    // Closing the DB connection allows Jest to exit successfully.
    // mongoose.connection.close();
    mongoose_1.default.disconnect();
});
var length = 0;
describe("Test for queries and mutation", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, organization_model_1.default.countDocuments().exec()];
                case 1:
                    length = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Get all organizations", function (done) {
        request
            .post(BASE_URL)
            .send({
            query: "{organizations{organization, _id}}",
        })
            .set("Accept", "Application/json")
            .expect("Content-Type", /json/)
            .end(function (err, res) {
            if (err)
                return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.organizations.length).toEqual(length);
            done();
        });
    });
    it("Get organizations by id", function (done) {
        request
            .post(BASE_URL)
            .send({
            query: '{ organization(_id:"5f7337c9a8548659bb0b1b89") { organization, ceo, marketValue} }',
        })
            .expect(200)
            .end(function (err, res) {
            // res will contain array with one organization
            if (err)
                return done(err);
            expect(res.body.data.organization).toHaveProperty("organization");
            expect(res.body.data.organization).toHaveProperty("ceo");
            expect(res.body.data.organization).toHaveProperty("marketValue");
            done();
        });
    });
    it("Creates organizations", function (done) {
        request
            .post(BASE_URL)
            .send({
            query: 'mutation { createOrganization (organization: "myOrg",marketValue: "50%",ceo: "ceo-name",address: "address is address",employees:["employee1","employee2"],products:["product1","product2"]){organization}}',
        })
            .expect(200)
            .end(function (err, res) {
            if (err)
                return done(err);
            expect(res.body.data.createOrganization).toHaveProperty("organization");
            done();
        });
    });
    it("Deletes organizations", function (done) {
        request
            .post(BASE_URL)
            .send({
            query: 'mutation { deleteOrganization (organization:"myOrg") { organization} }',
        })
            .expect(200)
            .end(function (err, res) {
            // res will contain array with one organization
            if (err)
                return done(err);
            expect(res.body.data.deleteOrganization).toHaveProperty("organization");
            done();
        });
    });
    it("Updates organizations", function (done) {
        request
            .post(BASE_URL)
            .send({
            query: 'mutation { updateOrganization (_id:"5f7337c9a8548659bb0b1b89", organization:"new name", marketValue:"100%") { _id , organization} }',
        })
            .expect(200)
            .end(function (err, res) {
            if (err)
                return done(err);
            expect(res.body.data.updateOrganization).toHaveProperty("organization");
            done();
        });
    });
});
