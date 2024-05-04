import { RequestHandler } from 'express';
import { verifyToken } from './helpers/generateToken';
import User from './routes/User';

export const authenticator: RequestHandler = async (req, _res, next): Promise<void> => {
  const authorization = req.header('authorization');

  if (typeof authorization !== "string") {
    console.warn("Missing Authorization header");
    return next();
  }

  const match = authorization.match(/Bearer (.*)/);

  if (!match) {
    console.warn("Invalid Authorization header");
    return next();
  }

  const token = match[1];

  // TODO: fix this
  if (!token) {
    console.warn("Missing token");
    return next();
  }

  const payload = await verifyToken(token);

  if (typeof payload !== 'object' || payload === null) {
    console.warn("Invalid token");
    return next();
  }

  const { _id } = payload;

  if (typeof _id !== 'string') {
    console.warn("Invalid payload. Token must be a string");
    return next();
  }

  const user = await User.findById(_id);

  if (!user) {
    console.warn("User not found");
    return next();
  }

  console.log("LOGGED IN");

  (req as any).user = user;

  next();
};
