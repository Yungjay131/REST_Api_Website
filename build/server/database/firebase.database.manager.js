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
exports.deleteUserFromFirebaseDB = exports.updateUserToFirebaseDB = exports.getUserFromFirebaseDB = exports.getUsersFromFirebaseDB = exports.addUserToFirebaseDB = exports.addUsersToFirebaseDB = void 0;
var FirebaseDatabaseHelper_1 = __importDefault(require("./FirebaseDatabaseHelper"));
var database_1 = require("firebase/database");
var RStatus_1 = require("../models/RStatus");
var database = FirebaseDatabaseHelper_1.default.getInstance().getFirebaseDatabase();
function addUsersToFirebaseDB(users) {
    return __awaiter(this, void 0, void 0, function () {
        var status;
        var _this = this;
        return __generator(this, function (_a) {
            try {
                users.forEach(function (user) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, (0, database_1.set)((0, database_1.ref)(database, "users/".concat(user.id)), user)];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                }); });
                console.log("users added successfully to FirebaseDB");
                status = RStatus_1.RStatus.SUCCESS;
            }
            catch (error) {
                console.log(error.message);
                status = RStatus_1.RStatus.FAILURE;
            }
            finally {
                return [2, { status: status, data: null }];
            }
            return [2];
        });
    });
}
exports.addUsersToFirebaseDB = addUsersToFirebaseDB;
function addUsersToFirebaseDB2(users) {
    return __awaiter(this, void 0, void 0, function () {
        var _users, status, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _users = JSON.stringify(users);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4, (0, database_1.set)((0, database_1.ref)(database, "users"), _users)];
                case 2:
                    _a.sent();
                    console.log("users added successfully to FirebaseDB");
                    status = RStatus_1.RStatus.SUCCESS;
                    return [3, 5];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1.message);
                    status = RStatus_1.RStatus.FAILURE;
                    return [3, 5];
                case 4: return [2, { status: status, data: null }];
                case 5: return [2];
            }
        });
    });
}
function addUserToFirebaseDB(user) {
    return __awaiter(this, void 0, void 0, function () {
        var status, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4, (0, database_1.set)((0, database_1.ref)(database, "users/".concat(user.id)), {
                            id: user.id,
                            fullname: user.fullname,
                            image: user.image,
                        })];
                case 1:
                    _a.sent();
                    console.log("user added successfully to FirebaseDB");
                    status = RStatus_1.RStatus.SUCCESS;
                    return [3, 4];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2.message);
                    status = RStatus_1.RStatus.FAILURE;
                    return [3, 4];
                case 3: return [2, { status: status, data: null }];
                case 4: return [2];
            }
        });
    });
}
exports.addUserToFirebaseDB = addUserToFirebaseDB;
function getUsersFromFirebaseDB() {
    var status;
    var data;
    var reference = (0, database_1.ref)(database, 'users/');
    return new Promise(function (resolve, reject) {
        try {
            (0, database_1.onValue)(reference, function (snapShot) {
                if (snapShot.val()) {
                    console.log("users retrieved successfully from FirebaseDB");
                    status = RStatus_1.RStatus.SUCCESS;
                    data = snapShot.val();
                    resolve({ status: status, data: data });
                }
                else {
                    status = RStatus_1.RStatus.FAILURE;
                    data = null;
                    resolve({ status: status, data: data });
                }
            }, { onlyOnce: true });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getUsersFromFirebaseDB = getUsersFromFirebaseDB;
function getUserFromFirebaseDB(userID) {
    return __awaiter(this, void 0, void 0, function () {
        var status, data, reference, snapShot, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reference = (0, database_1.ref)((0, database_1.getDatabase)());
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4, (0, database_1.get)((0, database_1.child)(reference, "users/".concat(userID)))];
                case 2:
                    snapShot = _a.sent();
                    if (snapShot.val()) {
                        console.log("user retrieved successfully from FirebaseDB");
                        status = RStatus_1.RStatus.SUCCESS;
                        data = snapShot.val();
                    }
                    else {
                        status = RStatus_1.RStatus.FAILURE;
                        data = null;
                    }
                    return [3, 5];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3.message);
                    status = RStatus_1.RStatus.FAILURE;
                    data = null;
                    return [3, 5];
                case 4: return [2, { status: status, data: data }];
                case 5: return [2];
            }
        });
    });
}
exports.getUserFromFirebaseDB = getUserFromFirebaseDB;
function updateUserToFirebaseDB(user) {
    return __awaiter(this, void 0, void 0, function () {
        var status, reference, index, updates, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reference = (0, database_1.ref)((0, database_1.getDatabase)(), "/users/".concat(user.id));
                    index = "/users/".concat(user.id);
                    updates = {
                        id: user.id,
                        fullname: user.fullname,
                        image: user.image,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4, (0, database_1.update)(reference, updates)];
                case 2:
                    _a.sent();
                    console.log("user info updated successfully to FirebaseDB");
                    status = RStatus_1.RStatus.SUCCESS;
                    return [3, 5];
                case 3:
                    error_4 = _a.sent();
                    console.log(error_4.message);
                    status = RStatus_1.RStatus.FAILURE;
                    return [3, 5];
                case 4: return [2, { status: status, data: null }];
                case 5: return [2];
            }
        });
    });
}
exports.updateUserToFirebaseDB = updateUserToFirebaseDB;
function deleteUserFromFirebaseDB(userID) {
    return __awaiter(this, void 0, void 0, function () {
        var status, reference, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reference = (0, database_1.ref)((0, database_1.getDatabase)(), "users/".concat(userID));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4, (0, database_1.remove)(reference)];
                case 2:
                    _a.sent();
                    console.log("user deleted successfully");
                    status = RStatus_1.RStatus.SUCCESS;
                    return [3, 5];
                case 3:
                    error_5 = _a.sent();
                    console.log(error_5.message);
                    status = RStatus_1.RStatus.FAILURE;
                    return [3, 5];
                case 4: return [2, { status: status, data: null }];
                case 5: return [2];
            }
        });
    });
}
exports.deleteUserFromFirebaseDB = deleteUserFromFirebaseDB;
