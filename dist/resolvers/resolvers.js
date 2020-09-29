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
exports.login = exports.register = exports.updateOrganization = exports.deleteOrganization = exports.createOrganization = exports.organization = exports.organizations = void 0;
var organization_model_1 = __importDefault(require("../models/organization.model"));
var user_model_1 = __importDefault(require("../models/user.model"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var joi_1 = __importDefault(require("joi"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var organizationSchema = joi_1.default.object().keys({
    organization: joi_1.default.string().required(),
    marketValue: joi_1.default.string(),
    address: joi_1.default.string(),
    ceo: joi_1.default.string().required(),
    country: joi_1.default.string(),
    employees: joi_1.default.array().items(joi_1.default.string()),
    products: joi_1.default.array().items(joi_1.default.string()),
});
exports.organizations = function (_a) {
    var first = _a.first, limit = _a.limit;
    return organization_model_1.default.find().limit(limit).skip(first).exec();
};
exports.organization = function (_a) {
    var _id = _a._id;
    return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, organization_model_1.default.find({ _id: _id }).exec()];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
};
function createOrganization(_a) {
    var organization = _a.organization, marketValue = _a.marketValue, ceo = _a.ceo, address = _a.address, employees = _a.employees, products = _a.products;
    var _b = organizationSchema.validate(arguments[0]), value = _b.value, error = _b.error;
    var valid = error == null;
    console.log("createOrganization() >>>>");
    if (!valid) {
        console.log("invalid data");
        return { error: error };
    }
    // console.log(arguments[0]);
    var new_organization = new organization_model_1.default(arguments[0]);
    console.log(new_organization);
    return new_organization.save();
}
exports.createOrganization = createOrganization;
exports.deleteOrganization = function (_a) {
    var organization = _a.organization;
    return organization_model_1.default.findOneAndDelete({ organization: organization });
};
function updateOrganization(_a) {
    var _id = _a._id, organization = _a.organization, marketValue = _a.marketValue, ceo = _a.ceo, address = _a.address, employees = _a.employees, products = _a.products;
    return __awaiter(this, void 0, void 0, function () {
        var updatedData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, organization_model_1.default.findOneAndUpdate({ _id: _id }, { organization: organization, marketValue: marketValue, ceo: ceo, address: address, employees: employees, products: products })];
                case 1:
                    updatedData = _b.sent();
                    return [2 /*return*/, updatedData];
            }
        });
    });
}
exports.updateOrganization = updateOrganization;
exports.register = function (_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var new_user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                case 1:
                    password = _b.sent();
                    new_user = new user_model_1.default({ email: email, password: password });
                    return [2 /*return*/, new_user.save()];
            }
        });
    });
};
exports.login = function (_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, valid, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        throw new Error("No user with that email").message;
                    }
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.get(password))];
                case 2:
                    valid = _b.sent();
                    if (!valid) {
                        throw new Error("Incorrect password").message;
                    }
                    token = jsonwebtoken_1.default.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                        expiresIn: "24h",
                    });
                    return [2 /*return*/, token];
            }
        });
    });
};
