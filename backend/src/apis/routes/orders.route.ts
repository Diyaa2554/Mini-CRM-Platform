import express from 'express';
import { isAuthenticated } from '../../middlewares/auth.middleware';
import { handleError } from '../../utils/response';
import { getAllOrders } from '../controllers/orders.controller';


const router = express.Router();
router.route("/getAllOrders").get(
    isAuthenticated,
    handleError(getAllOrders)
)
export default router;