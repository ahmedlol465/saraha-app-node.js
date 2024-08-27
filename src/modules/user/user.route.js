import { Router } from "express";
import * as usercontroller from "./user.controllar.js";
import expressAsyncHandeler from "express-async-handler";
const router = Router();

router.post("/", expressAsyncHandeler(usercontroller.Signup));
router.post("/signin", expressAsyncHandeler(usercontroller.SignIn));
router.put("/", expressAsyncHandeler(usercontroller.updateData));
router.delete("/", expressAsyncHandeler(usercontroller.deletUser));
router.get("/:_id", expressAsyncHandeler(usercontroller.getUser));
export default router;

