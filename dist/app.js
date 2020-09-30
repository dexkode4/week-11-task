"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_graphql_1 = require("express-graphql");
var schema_1 = require("./schema");
var resolvers_1 = require("./resolvers/resolvers");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = express_1.default();
// const url =
mongoose_1.default
    .connect("" + process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(function () { return console.log("connected to MongoDB."); })
    .catch(function (err) { return console.log("Could not connect to Mongo db"); });
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// resolvers
var root = {
    organizations: resolvers_1.organizations,
    organization: resolvers_1.organization,
    createOrganization: resolvers_1.createOrganization,
    deleteOrganization: resolvers_1.deleteOrganization,
    updateOrganization: resolvers_1.updateOrganization,
    register: resolvers_1.register,
    login: resolvers_1.login,
};
// app.use(auth);
app.use("/gql", express_graphql_1.graphqlHTTP(function (req, res) { return ({
    schema: schema_1.schema,
    rootValue: root,
    graphiql: true,
    context: { req: req, res: res },
}); }));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
exports.default = app;
