/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../interfaces/user.interface';
import { DB } from '..';

export interface IAuthDao {
	register: (username: string, email: string, password: string, role: string) => Promise<User>,
	login: (req: Request, res: Response) => Promise<any>
}

export class AuthDao implements IAuthDao {
	public async register(username: string, email: string, password: string, role: string): Promise<User> {
		try {
			const passwordHash = await bcrypt.hash(password, 10);
			const newUser = DB.user.create({
				data: {
					username,
					email,
					password: passwordHash,
				},
				select: {
					id: true, username: true, email: true,
					is_app_installed: true, enabled: true, verified: true,
					last_active: true, created_at: true, updated_at: true
				}
			});
			return newUser;
		} catch (error) {
			throw error;
		}
	}

	public async login(req: Request, res: Response): Promise<any> {
		try {
			return new Promise((resolve, reject) => {
				passport.authenticate('local', { session: false }, (error, user) => {
					if (error || !user) {
						console.log('error', error);
						reject(error);
						return;
					}

					/** This is what ends up in our JWT */
					const payload = {
						email: user.email,
						role: user.role,
					};

					/** assigns payload to req.user */

					/** generate a signed json web token and return it in the response */
					const token = jwt.sign(payload, process.env.JWT_SECRET, {
						expiresIn: '12h',
					});

					resolve({ payload, token });
				})(req, res);
			});
		} catch (err) {
			throw err;
		}
	}
}