/**
 * @openapi
 * tags:
 *   name: Customers
 *   description: API for managing customer data
 */

/**
 * @openapi
 * /api/customers/getAllCustomers:
 *   get:
 *     summary: Retrieve all customers for the authenticated user
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: [] # Assuming bearerAuth is defined in your main swagger components
 *     responses:
 *       200:
 *         description: Customers fetched successfully.
 *       401:
 *         description: User not authenticated.
 *       404:
 *         description: No customers found.
 */