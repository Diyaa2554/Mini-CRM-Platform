import { NextFunction, Request, Response } from 'express';
import {  validationResult } from 'express-validator';

export function success(result: any = 'OK', status: number = 200) {
	const sanitizedResult = JSON.parse(
		JSON.stringify(result, (_, value) =>
			typeof value === 'bigint' ? value.toString() : value
		)
	);
	return {
		status,
		success: true,
		response: sanitizedResult,
	};
}

export function error(
	message: any = 'Some internal server error occurred',
	status: number = 500
) {
	return {
		status,
		success: false,
		response: message,
	};
}


export function handleError(
	controller: (
		req: Request,
		res: Response
	) => Promise<{ success: boolean; status: number; response: any }>
) {
	return async (req: Request, res: Response) => {
		try {
			const { success, status, response } = await controller(req, res);
			res.status(status).json({ status, success, response });
		} catch (err: any) {
			console.log(err);
			res.status(500).json(
				error(err?.message || 'Some internal server error occurred', 500)
			);
		}
	};
}


export function checkError(req: Request, res: Response, next: NextFunction) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json(error(errors.array()[0].msg, 422));
	}else{
		next();
	}
}

