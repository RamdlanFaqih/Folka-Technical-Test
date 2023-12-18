/* eslint-disable no-undef */
import "dotenv/config";

import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const tokenData = process.env.SECRET_KEY;

const generateToken = async (payload) => {
    const token = await jwt.sign(payload, tokenData, {
        expiresIn: "1h"
    });
    console.log(token);
    return token;
};

export { generateToken };