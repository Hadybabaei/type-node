"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app")); // Corrected import path to the local file 'app.ts'
require("dotenv/config");
var validateEnv_1 = __importDefault(require("./utils/validateEnv"));
var posts_controller_1 = __importDefault(require("./resources/posts/posts.controller"));
var users_controller_1 = __importDefault(require("./resources/users/users.controller"));
(0, validateEnv_1.default)();
var app = new app_1.default([new posts_controller_1.default(), new users_controller_1.default()], Number(process.env.PORT));
app.listen();
