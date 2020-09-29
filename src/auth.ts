import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token: any = req.headers.authorization?.split(" ")[1];
		
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
		const { userId }: any = decodedToken;
		
		console.log("the token",token);
		if (req.body.userId && req.body.userId !== userId) {
			throw "Invalid user ID";
		} 
		
	} catch (error) {
		console.log(error.message);
		
		res.status(401).json({
			error: new Error("Invalid request").message,
		});
	}
};
