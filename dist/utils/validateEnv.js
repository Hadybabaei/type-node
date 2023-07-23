"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envalid_1 = require("envalid");
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        PORT: (0, envalid_1.port)({ default: 5001 }),
        MONGODB_URL: (0, envalid_1.str)(),
        JWT_SECRET: (0, envalid_1.str)()
    });
}
exports.default = validateEnv;
