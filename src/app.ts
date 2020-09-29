import createError, { HttpError } from "http-errors";
import express, { NextFunction, Response, Request } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import {
	organization,
	organizations,
	createOrganization,
	deleteOrganization,
	updateOrganization,
	register,
	login,
} from "./resolvers/resolvers";

const app = express();
const url = "mongodb+srv://dexkode:incorrect@cluster0.cqlmp.mongodb.net/week9task?retryWrites=true&w=majority"
//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false
// connect to mongodb
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log("connected to MongoDB."))
	.catch(err => console.log("Could not connect to Mongo db"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// resolvers
const root = {
	organizations,
	organization,
	createOrganization,
	deleteOrganization,
	updateOrganization,
	register,
	login,
};

// app.use(auth);

app.use(
	"/gql",
	graphqlHTTP((req, res) => ({
		schema: schema,
		rootValue: root,
		graphiql: true,
		context: { req, res },
	}))
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (
	err: HttpError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

export default app;
