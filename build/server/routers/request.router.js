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
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var ResponseStatus_1 = require("../models/ResponseStatus");
var filename = path_1.default.join(__dirname, "..", "data.json");
var router = express_1.default.Router();
var START = 0;
var START_FOR_USERS = 1;
var LOWER_LIMIT = 50;
var LIMIT = 299;
var data_from_JSON;
var data_list;
_getData();
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, param, _param, param_start, param_end, _param_start, _param_end;
    return __generator(this, function (_a) {
        params = req.query;
        switch (_check(params)) {
            case ResponseStatus_1.ResponseStatus.USERS: {
                console.log("landed on USERS");
                param = params["users"];
                _param = parseInt(param);
                res.send(getDataFromJSON(_param));
                break;
            }
            case ResponseStatus_1.ResponseStatus.RANGE: {
                console.log("landed on RANGE");
                param_start = params["start"];
                param_end = params["end"];
                _param_start = parseInt(param_start);
                _param_end = parseInt(param_end);
                res.send(getDataFromJSON2(_param_start, _param_end));
                break;
            }
            case ResponseStatus_1.ResponseStatus.DEFAULT: {
                console.log("landed on DEFAULT");
                res.send(getDataFromJSON2(START, LOWER_LIMIT));
                break;
            }
            default:
                console.log("error from check()");
        }
        return [2];
    });
}); });
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(req);
        res.status(201).json({
            status: "success",
        });
        return [2];
    });
}); });
function _check(request_params) {
    var condition_1 = request_params["users"];
    var condition_2 = request_params["start"];
    var condition_3 = request_params["end"];
    if (condition_1) {
        console.log("num of users" + request_params["users"]);
        var num_users = parseInt(request_params["users"]);
        var _condition_1 = !isNaN(num_users);
        if (_condition_1) {
            var __condition_1 = num_users > START_FOR_USERS;
            var __condition_2 = num_users <= LIMIT;
            if (__condition_1 && __condition_2)
                return ResponseStatus_1.ResponseStatus.USERS;
        }
    }
    if (condition_2 && condition_3) {
        var num_start = parseInt(request_params["start"]);
        var num_end = parseInt(request_params["end"]);
        var _condition_1 = !isNaN(num_start);
        var _condition_2 = !isNaN(num_end);
        if (_condition_1 && _condition_2) {
            var __condition_1 = num_start >= START;
            var __condition_2 = num_end <= LIMIT;
            if (__condition_1 && __condition_2)
                return ResponseStatus_1.ResponseStatus.RANGE;
        }
    }
    return ResponseStatus_1.ResponseStatus.DEFAULT;
}
function getDataFromJSON(num_of_users) {
    var _data = [];
    var index = 1;
    while (index <= num_of_users) {
        _data.push(data_list[generateRandomNumber()]);
        index++;
    }
    return JSON.stringify(_data);
}
function getDataFromJSON2(start, end) {
    var _data = [];
    var index;
    for (index = start; index <= end; index++) {
        _data.push(data_list[index]);
    }
    return JSON.stringify(_data);
}
function _getData() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fs_1.promises.readFile(filename, "utf8")];
                case 1:
                    data_from_JSON = _a.sent();
                    data_list = JSON.parse(data_from_JSON);
                    return [2];
            }
        });
    });
}
function generateRandomNumber() {
    var number = Math.random();
    if (number > 0.299)
        generateRandomNumber();
    var _number = number * 100;
    var __number = Math.floor(_number);
    console.log("the final number returned is ".concat(__number));
    return __number;
}
exports.default = router;
