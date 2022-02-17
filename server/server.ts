import express from "express";
import path from "path";

import request_router from "./routers/request.router";
import login_router from "./routers/login.router";
import users_router from "./routers/users.router";
import account_router from "./routers/accounts.router";

const app = express();

/* Body Parser:to give access to the body of the request */
app.use(express.json());

/* remember relative to where it is from the build folder */
app.use(express.static(path.join(__dirname, "..", "..", "client", "public")));

/* for logging in, handled in the POST */
app.use("/login", login_router);

/* for returning the makeshift data would be replaced with mongoDB and Firebase */
app.use("/api", request_router);

/* for adding users to the User DB */
app.use("/users", users_router);

/* for adding accounts to the accountsDB */
app.use("/account", account_router);

app.listen(3000);
console.log(`listening on port:3000`);
