import { Router } from 'express';
import * as messagecontoller from './messages.controllar.js'
import expressAsyncHandeler from "express-async-handler";
const router = Router()

router.post("/:sendTo", expressAsyncHandeler(messagecontoller.sendmessage));
router.delete("/", expressAsyncHandeler(messagecontoller.deleteMessage));
router.put("/", expressAsyncHandeler(messagecontoller.MarkAsRead));  // edit in two things
router.get('/', expressAsyncHandeler(messagecontoller.listUserMessage));  // edit in two things
export default router
