"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var MongooseManager = (function () {
    function MongooseManager() {
        this.filename = path_1.default.join(__dirname, '..', 'data.json');
        this.ERROR_JSON = { success: false };
        this.SUCCESS_JSON = { success: true };
        this.mongooseHelper = undefined;
        this.userModel = undefined;
    }
    MongooseManager.getInstance = function () {
        if (!this.INSTANCE) {
            this.INSTANCE = new MongooseManager();
        }
        return this.INSTANCE;
    };
    return MongooseManager;
}());
exports.default = MongooseManager;
