"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.auth = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        var decodedToken = jsonwebtoken_1.default.verify(token, "RANDOM_TOKEN_SECRET");
        var userId = decodedToken.userId;
        console.log("the token", token);
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(401).json({
            error: new Error("Invalid request").message,
        });
    }
};
