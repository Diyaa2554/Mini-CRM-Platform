import express from 'express';
import { isAuthenticated } from '../../middlewares/auth.middleware';
import { handleError } from '../../utils/response';
import { getAllCustomers } from '../controllers/customers.controller';

const router = express.Router();

router.route("/getAllCustomers").get(
    isAuthenticated,
    handleError(getAllCustomers)
)

export default router;