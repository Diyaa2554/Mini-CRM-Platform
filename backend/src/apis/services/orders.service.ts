import Order from '../../models/Order';

export async function getAllOrdersService(userId: string) {
  try {
    const orders = await Order.find({ userId: userId });
    if (!orders) {
      return null;
    }
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return null;
  }
}
