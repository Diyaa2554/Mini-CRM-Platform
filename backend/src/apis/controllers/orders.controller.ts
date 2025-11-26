import { AuthenticatedRequest } from "../../interfaces/interfaces";
import { error, success } from "../../utils/response";
import { getAllOrdersService } from "../services/orders.service";


export async function getAllOrders(req : AuthenticatedRequest){
    const { user } = req;
    if (!user) {
        return error("User not authenticated.", 401);
    }
    const orders = await getAllOrdersService(user.id);
    if (!orders) {
        return error("No orders found.", 404);
    }
    return success({
        message: "Orders fetched successfully",
        orders: orders
    }, 200)
}