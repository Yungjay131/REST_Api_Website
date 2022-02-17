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
var express_1 = __importDefault(require("express"));
var DatabaseHelper_1 = __importDefault(require("../database/DatabaseHelper"));
var RStatus_1 = require("../models/RStatus");
var DATA;
var SUCCESS_JSON = { status: 'success', data: DATA };
var ERROR_JSON = { status: 'failed' };
var databaseHelper = DatabaseHelper_1.default.getInstance();
var router = express_1.default.Router();
router.get('/init', addUsers);
router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/', addUser);
router.post('/:id', updateUser);
router.delete('/:id', deleteUser);
function addUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, databaseHelper.addUsers()];
                case 1:
                    _res = _a.sent();
                    if (_res.status === RStatus_1.RStatus.SUCCESS) {
                        res
                            .status(201)
                            .json({ status: 'success', message: 'users added successfully' });
                        return [2];
                    }
                    res
                        .status(500)
                        .json({ status: 'failure', message: '500: Internal Server Error' });
                    return [2];
            }
        });
    });
}
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, databaseHelper.getUsers()];
                case 1:
                    _res = _a.sent();
                    if (_res.status === RStatus_1.RStatus.SUCCESS) {
                        res.status(201).json({ status: 'success', message: _res.data });
                        return [2];
                    }
                    res
                        .status(500)
                        .json({ status: 'failure', message: '500: Internal Server Error' });
                    return [2];
            }
        });
    });
}
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("".concat(req.params.id));
                    id = Number(req.params.id);
                    if (!check(id)) {
                        res
                            .status(404)
                            .json({ status: 'failure', message: 'please check the url' });
                        return [2];
                    }
                    return [4, databaseHelper.getUser(id)];
                case 1:
                    _res = _a.sent();
                    if (_res.status === RStatus_1.RStatus.SUCCESS) {
                        res.status(201).json({ status: 'success', message: _res.data });
                        return [2];
                    }
                    res
                        .status(500)
                        .json({ status: 'failure', message: '500: Internal Server Error' });
                    return [2];
            }
        });
    });
}
function check(params) {
    return true;
}
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    return [4, databaseHelper.addUser(req.body)];
                case 1:
                    _res = _a.sent();
                    if (_res.status === RStatus_1.RStatus.SUCCESS) {
                        res
                            .status(201)
                            .json({ status: 'success', message: 'user added successfully' });
                        return [2];
                    }
                    res
                        .status(500)
                        .json({ status: 'failure', message: '500: Internal Server Error' });
                    return [2];
            }
        });
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    return [4, databaseHelper.updateUser(req.body, req.params.id)];
                case 1:
                    _res = _a.sent();
                    if (_res.status === RStatus_1.RStatus.SUCCESS) {
                        res
                            .status(201)
                            .json({ status: 'success', message: 'user updated successfully' });
                        return [2];
                    }
                    res
                        .status(500)
                        .json({ status: 'failure', message: '500: Internal Server Error' });
                    return [2];
            }
        });
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = Number(req.params.id);
                    return [4, databaseHelper.deleteUser(id)];
                case 1:
                    _res = _a.sent();
                    if (_res.status === RStatus_1.RStatus.SUCCESS) {
                        res
                            .status(201)
                            .json({ status: 'success', message: 'user deleted successfully' });
                        return [2];
                    }
                    res
                        .status(500)
                        .json({ status: 'failure', message: '500: Internal Server Error' });
                    return [2];
            }
        });
    });
}
exports.default = router;
