"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var request_router_1 = __importDefault(require("./routers/request.router"));
var login_router_1 = __importDefault(require("./routers/login.router"));
var users_router_1 = __importDefault(require("./routers/users.router"));
var accounts_router_1 = __importDefault(require("./routers/accounts.router"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "..", "client", "public")));
app.use("/login", login_router_1.default);
app.use("/api", request_router_1.default);
app.use("/users", users_router_1.default);
app.use("/account", accounts_router_1.default);
app.listen(3000);
console.log("listening on port:3000");
