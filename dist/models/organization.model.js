"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
exports.organizationSchema = new Schema({
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
var Organization = mongoose_1.default.model("Organization", exports.organizationSchema);
exports.default = Organization;
