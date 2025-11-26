import { AuthenticatedRequest } from "../../interfaces/interfaces";
import { error, success } from "../../utils/response";
import { getAllCustomersService } from "../services/customers.service";

export async function getAllCustomers(req : AuthenticatedRequest){
    const { user } = req;
    if (!user || !user.id) {
        return error("User not authenticated.", 401);
    }
    const customers = await getAllCustomersService(user.id);
    if (!customers) {
        return error("No customers found.", 404);
    }
    return success({
        message: "Customers fetched successfully",
        customers: customers
    }, 200);
}