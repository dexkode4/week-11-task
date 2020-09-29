"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
var User = mongoose_1.default.model("Users", userSchema);
exports.default = User;
