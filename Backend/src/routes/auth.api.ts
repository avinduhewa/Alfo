import { Request, Response, Router } from 'express';

import { AuthDao } from '../daos';

// Init shared
const router = Router();
const authDao = new AuthDao();

/******************************************************************************
 *                      add user - "POST /api/auth/register"
 ******************************************************************************/

router.post('/register', async (req: Request, res: Response) => {
	try {
		const { username, email, password, role } = req.body;
		const user = await authDao.register(username, email, password, role);
		return res.status(201).send(user);
	} catch (error) {
		console.log('FUCK', error.message);
	}
});


/******************************************************************************
 *                      get user auth details - "POST /api/auth/login"
 ******************************************************************************/

router.post('/login', async (req: Request, res: Response) => {
	let response;
	let status;
	try {
		response = await authDao.login(req, res);
		status = 200;
	} catch (error) {
		response = error;
		status = 400;
	}
	return res.status(status).send(response);
});


export default router;