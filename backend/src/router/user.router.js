import express from "express";
import userController from "../controller/user.controller.js";
import { requireAuth } from "../middleware/auth.js";
import verifyToken from "../middleware/staticAuth.js";
const router = express.Router();

router.get("/users", verifyToken, requireAuth, userController.list);
router.get("/users/:id", verifyToken, requireAuth, userController.getUser);
router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.put("/update", verifyToken, requireAuth, userController.update);
router.delete("/delete", verifyToken, requireAuth, userController.delete);

export default router;
