import express from 'express';
import { isAuthenticated } from '../../middlewares/auth.middleware';
import { checkError, handleError } from '../../utils/response';
import { createSegmentRule, getAllSegmentRules } from '../controllers/segmentRules.controller';
import { get } from 'http';


const router = express.Router();

router.route("/create").post(
    isAuthenticated,
    handleError(createSegmentRule)
)

router.route("/getAllSegmentRules").get(
    isAuthenticated,
    handleError(getAllSegmentRules)
)

export default router;