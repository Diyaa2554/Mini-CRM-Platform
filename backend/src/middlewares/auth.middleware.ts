import { Response, NextFunction } from 'express';
import { OAuth2Client, LoginTicket } from 'google-auth-library';
import { getUserByEmailService } from '../apis/services/user.service'; 
import { IUser } from '../interfaces/interfaces';
import { AuthenticatedRequest } from '../interfaces/interfaces'; 
import { error as errorResponse } from '../utils/response'; 


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

if (!GOOGLE_CLIENT_ID) {
  console.error("FATAL ERROR: GOOGLE_CLIENT_ID is not defined in .env file for auth middleware.");
    process.exit(1);
}

export async function isAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json(errorResponse('No token provided or token format is incorrect.', 401));
    return;
  }

  const idToken = authHeader.split(' ')[1];

  if (!idToken) {
    res.status(401).json(errorResponse('No token provided.', 401));
    return;
}

  if (!GOOGLE_CLIENT_ID) {
    console.error("Google Client ID is not configured for token verification in middleware.");
    res.status(500).json(errorResponse('Server configuration error.', 500));
    return;
  }

  try {
    const ticket: LoginTicket = await client.verifyIdToken({
      idToken: idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      res.status(401).json(errorResponse('Invalid token: Missing payload or email.', 401));
      return;
    }


    const user: IUser | null = await getUserByEmailService(payload.email);

    if (!user) {
      res.status(403).json(errorResponse('User not found in our system. Please sign up or log in again.', 403));
      return;
    }


    req.user = {
      id: user._id!.toString(),
      email: user.email,
      name: user.name,
    };

    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json(errorResponse('Invalid or expired token.', 401));
    return;
  }
}