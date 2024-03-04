import jwt, { decode } from "jsonwebtoken";
const SALT = 10;

const createToken = async (payload) => {
  let token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
};
const decodeToken = async (token) => {
  return await jwt.decode(token);
};

const authenticate = async (req, res, next) => {
  let token = req?.headers?.authorization?.split(" ")[1];
  if (token) {
    let payload = await decodeToken(token);

    let currentTime = +new Date();
    if (Math.floor(currentTime / 1000) < payload.exp) {
      next();
    } else {
      res.status(402).send({
        message: "Session Expired",
      });
    }
  } else {
    res.status(402).send({
      message: "Unauthorised authenticate  access",
    });
  }
};

const deliveryGuard = async (req, res, next) => {
  let token = req?.headers?.authorization?.split(" ")[1];
  if (token) {
    let payload = await decodeToken(token);

    if (payload.role == "delivery") {
      next();
    } else {
      res.status(402).send({
        message: "Only delivery are allowed",
      });
    }
  } else {
    res.status(402).send({
      message: "Unauthorised access",
    });
  }
};

export default {
  createToken,
  authenticate,
  deliveryGuard,
};
