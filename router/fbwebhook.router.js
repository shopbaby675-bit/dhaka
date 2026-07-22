// IMPORT PAKAGE 
import express from "express";

// IMPORT OTHER JS FILE 
import veryfiedfbwebhook from '../utils/veryfiedfbwebhook.controll.js'
import { GetNewMassUserInfo } from "../controller/getNewMassUserInfo.controller.js";

// CREATE ROUTER
const router = express.Router();

// VERYFY ACCOUNT WEBHOOK
router.get('/', veryfiedfbwebhook)
router.post('/', GetNewMassUserInfo)


// EXPORT ROUTER CONFIG
export default router;