import { StrategyOptions, ExtractJwt, Strategy } from 'passport-jwt';
import passport from 'passport';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { sign, Secret, SignOptions } from 'jsonwebtoken';

export interface AuthOptions {
  secret: string;
  options?: {
    expiresIn?: string;
    issuer?: string;
    audience?: string;
  };
  // validateUser<T>(jwtPayload: any): Promise<T>;
}

export const useJwtStrategy = (options: AuthOptions): void => {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: options.secret,
    // issuer: options.issuer,
    // audience: options.audience,
  };
  const strategy = new Strategy(opts, (payload, done) => {
    const { iat, exp, aud, iss, ...user } = payload;
    // In real life user must be validated
    return done(null, user);
  });
  passport.use(strategy);
};

export const jwtAuthenticateMiddleware = (): RequestHandler => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};

export const generateToken = (
  payload: string | object | Buffer,
  secret: Secret,
  options: SignOptions,
) => {
  return sign(payload, secret, options);
};
