import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";

import { getCookie } from "cookies-next";

export const hashPassword = (password) => bcrypt.hash(password, 10);
export const hashUserAccessCodes = (code) => bcrypt.hash(code, 10);

export const compareUserAccessCodes = (plaintextCode, hashedCode) =>
  bcrypt.compare(plaintextCode, hashedCode);

export const comparePasswords = (plainTextPassword, hashedPassword) =>
  bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = (user) => {
  // return jwt.sign({ id: user.id }, 'cookies')
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.payload as any;
};

export const getUserFromCookie = async (cookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};

export const getUserFromCookieServer = async (req, res) => {
  const jwt = getCookie(process.env.COOKIE_NAME, { req, res });
  const user = await validateJWT(jwt);

  return user;
};
