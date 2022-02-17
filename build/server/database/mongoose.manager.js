"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserFromMongoDB = exports.updateUserToMongoDB = exports.getUserFromMongoDB = exports.getUsersFromMongoDB = exports.addUserToMongoDB = exports.addUsersToMongoDB = void 0;
var mongoose_1 = require("mongoose");
var MongooseHelper_1 = __importDefault(require("./MongooseHelper"));
var RStatus_1 = require("../models/RStatus");
var mongooseHelper = undefined;
var userModel = undefined;
var accountModel = undefined;
var init_status = false;
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mongooseHelper = MongooseHelper_1.default.getInstance();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, mongooseHelper.getUsersDBModel()];
                case 2:
                    userModel = _a.sent();
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log("error occurred getting UserModel from MongooseHelper.ts");
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
function getAccountModel() {
    return __awaiter(this, void 0, mongoose_1.Model, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (accountModel) {
                        return [2, accountModel];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, MongooseHelper_1.default.getInstance().getAccountDBModel()];
                case 2:
                    accountModel = _a.sent();
                    return [2, accountModel];
                case 3:
                    error_2 = _a.sent();
                    console.log("error occurred getting AccountModel from MongooseHelper.ts, ".concat(error_2.message));
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
function getUserModel() {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (userModel) {
                        return [2, userModel];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, MongooseHelper_1.default.getInstance().getUsersDBModel()];
                case 2:
                    userModel = _a.sent();
                    return [2, userModel];
                case 3:
                    error_3 = _a.sent();
                    console.log("error occurred getting UserModel from MongooseHelper.ts, ".concat(error_3.message));
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
function addUsersToMongoDB(users) {
    return __awaiter(this, void 0, void 0, function () {
        var result, model, _data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4, getUserModel()];
                case 1:
                    model = _a.sent();
                    console.log("this is model: ".concat(model));
                    return [4, model.insertMany(users)];
                case 2:
                    _data = _a.sent();
                    console.log("users added successfully to Mongo DB");
                    result = RStatus_1.RStatus.SUCCESS;
                    return [3, 5];
                case 3:
                    error_4 = _a.sent();
                    console.log("error occurred in $_addJSONDataToDB(): ".concat(error_4.message));
                    console.log("this is the stack trace:".concat(error_4.stack));
                    result = RStatus_1.RStatus.FAILURE;
                    return [3, 5];
                case 4: return [2, { status: result, data: null }];
                case 5: return [2];
            }
        });
    });
}
exports.addUsersToMongoDB = addUsersToMongoDB;
function addUserToMongoDb2(user) {
    return __awaiter(this, void 0, void 0, function () {
        var result, _user, __user, _data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _user = {
                        id: user.id,
                        fullname: user.fullname,
                        image: user.image,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    __user = new userModel(_user);
                    return [4, __user.save()];
                case 2:
                    _data = _a.sent();
                    console.log("user added successfully to Mongo DB");
                    result = RStatus_1.RStatus.SUCCESS;
                    return [3, 5];
                case 3:
                    error_5 = _a.sent();
                    console.log("error occurred in $addUserToMongoDBr(): ".concat(error_5.message));
                    result = RStatus_1.RStatus.FAILURE;
                    return [3, 5];
                case 4: return [2, { status: result, data: null }];
                case 5: return [2];
            }
        });
    });
}
function addUserToMongoDB(user) {
    return __awaiter(this, void 0, void 0, function () {
        var result, _user, model, _data, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _user = {
                        id: user.id,
                        fullname: user.fullname,
                        image: user.image,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4, getUserModel()];
                case 2:
                    model = _a.sent();
                    return [4, model.create(_user)];
                case 3:
                    _data = _a.sent();
                    console.log("user added successfully to Mongo DB");
                    result = RStatus_1.RStatus.SUCCESS;
                    return [3, 6];
                case 4:
                    error_6 = _a.sent();
                    console.log("error occurred in $addUserToMongoDBr(): ".concat(error_6.message));
                    result = RStatus_1.RStatus.FAILURE;
                    return [3, 6];
                case 5: return [2, { status: result, data: null }];
                case 6: return [2];
            }
        });
    });
}
exports.addUserToMongoDB = addUserToMongoDB;
function getUsersFromMongoDB() {
    return __awaiter(this, void 0, void 0, function () {
        var result, data, model, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4, getUserModel()];
                case 1:
                    model = _a.sent();
                    return [4, model.find()];
                case 2:
                    data = _a.sent();
                    console.log('users successfully retrieved from Mongo DB');
                    result = RStatus_1.RStatus.SUCCESS;
                    return [3, 5];
                case 3:
                    error_7 = _a.sent();
                    console.log("error occurred in $getUsersFromMongoDB(): ".concat(error_7.message));
                    result = RStatus_1.RStatus.FAILURE;
                    return [3, 5];
                case 4: return [2, { status: result, data: data }];
                case 5: return [2];
            }
        });
    });
}
exports.getUsersFromMongoDB = getUsersFromMongoDB;
function getUserFromMongoDB(userID) {
    return __awaiter(this, void 0, void 0, function () {
        var result, data, model, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4, getUserModel()];
                case 1:
                    model = _a.sent();
                    return [4, model.findById(userID)];
                case 2:
                    data = _a.sent();
                    console.log('user successfully retrieved from Mongo DB');
                    result = RStatus_1.RStatus.SUCCESS;
                    return [3, 5];
                case 3:
                    error_8 = _a.sent();
                    console.log("error occurred in $getUserFromMongoDB(): ".concat(error_8.message));
                    result = RStatus_1.RStatus.FAILURE;
                    return [3, 5];
                case 4: return [2, { status: result, data: data }];
                case 5: return [2];
            }
        });
    });
}
exports.getUserFromMongoDB = getUserFromMongoDB;
function updateUserToMongoDB(user) {
    return __awaiter(this, void 0, void 0, function () {
        var result, _user, options, model, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _user = {
                        id: user.id,
                        fullname: user.fullname,
                        image: user.image,
                    };
                    options = {
                        new: true,
                        runValidators: true,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4, getUserModel()];
                case 2:
                    model = _a.sent();
                    return [4, model.findByIdAndUpdate(_user.id, _user, options)];
                case 3:
                    _a.sent();
                    console.log('user successfully updated in Mongo DB');
                    result = RStatus_1.RStatus.SUCCESS;
                    return [3, 6];
                case 4:
                    error_9 = _a.sent();
                    console.log("error occurred in $updateUserToMongoDB(): ".concat(error_9.message));
                    result = RStatus_1.RStatus.FAILURE;
                    return [3, 6];
                case 5: return [2, { status: result, data: null }];
                case 6: return [2];
            }
        });
    });
}
exports.updateUserToMongoDB = updateUserToMongoDB;
function deleteUserFromMongoDB(userID) {
    return __awaiter(this, void 0, void 0, function () {
        var result, options, model, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        new: true,
                        runValidators: true,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4, getUserModel()];
                case 2:
                    model = _a.sent();
                    return [4, model.findByIdAndDelete(userID, options)];
                case 3:
                    _a.sent();
                    console.log('user successfully deleted from Mongo DB');
                    result = RStatus_1.RStatus.SUCCESS;
                    return [3, 6];
                case 4:
                    error_10 = _a.sent();
                    console.log("error occurred in $deleteUserFromMongoDB(): ".concat(error_10.message));
                    result = RStatus_1.RStatus.FAILURE;
                    return [3, 6];
                case 5: return [2, { status: result, data: null }];
                case 6: return [2];
            }
        });
    });
}
exports.deleteUserFromMongoDB = deleteUserFromMongoDB;
