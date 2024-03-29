"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var register = joi_1.default.object({
    fullname: joi_1.default.string().required().max(30),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
var login = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.default = { register: register, login: login };
