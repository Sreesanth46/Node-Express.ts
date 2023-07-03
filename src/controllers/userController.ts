import { Request, Response } from 'express'
import { createUser, getUserByEmail } from '../models/user.js';
import { authentication, generateOTP } from '../helpers/index.js';

const SALT = process.env.SALT || 'PASSWORD_SALT';

export const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, contactMode } = req.body

        if (!firstName || !lastName || !email || !password || !contactMode) return res.sendStatus(400);

        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.sendStatus(400)

        const user = await createUser({
            firstName,
            lastName,
            password: authentication(SALT, password),
            contactMode,
            email,
            otp: generateOTP()
        })

        return res.status(201).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}