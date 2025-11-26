/**
 * @openapi
 * tags:
 *   name: Orders
 *   description: API for managing order data
 */

/**
 * @openapi
 * /api/orders/getAllOrders:
 *   get:
 *     summary: Retrieve all orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: [] # Assuming bearerAuth is defined in your main swagger components
 *     responses:
 *       200:
 *         description: Orders fetched successfully.
 *       401:
 *         description: User not authenticated.
 *       404:
 *         description: No orders found.
 *       500:
 *         description: Internal server error.
*/