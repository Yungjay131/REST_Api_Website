"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var AccountSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "please add a valid email address"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "please use a valid password"],
        trim: true,
    },
    phone_number: {
        type: String,
        required: [true, "please enter a valid phone number"],
        trim: true,
    },
});
exports.default = AccountSchema;
