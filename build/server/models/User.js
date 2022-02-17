"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: [true, 'please add an ID for the User'],
    },
    fullname: {
        type: String,
        required: [true, 'please add a name for the User'],
        trim: true,
    },
    image: {
        type: String,
        required: [true, 'please add an image URL'],
        trim: true,
    },
});
exports.default = UserSchema;
