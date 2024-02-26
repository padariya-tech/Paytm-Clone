import {Router } from "express";
const router = Router();

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getBalance, transferMoney } from "../controllers/account.controller.js";



router.route("/balance").get(verifyJWT,getBalance)
router.route("/transfer").post(verifyJWT,transferMoney)

export default  router;