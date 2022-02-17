"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = __importDefault(require("jquery"));
(0, jquery_1.default)(function () {
    console.log("currently in login.js");
    var divContainer = (0, jquery_1.default)("#container");
    (0, jquery_1.default)("#signUp").on("click", function () {
        divContainer.addClass("right-panel-active");
    });
    (0, jquery_1.default)("#signIn").on("click", function () {
        divContainer.removeClass("right-panel-active");
    });
});
