/**
 * @openapi
 * tags:
 *   name: Data Upload
 *   description: API for ingesting customer and order data via CSV files
 */


/**
 * @openapi
 * /api/uploads/customers:
 *   post:
 *     summary: Upload a CSV file to ingest customer data
 *     tags: [Data Upload]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: CSV file containing customer data. Headers should include name, email, and optionally customer_external_id, phone, location.
 *     responses:
 *       200:
 *         description: Customers file processed successfully. All records were processed without errors.
 *       207:
 *         description: Customers file processed with some errors (Multi-Status). Some records may have failed.
 *       400:
 *         description: Bad request (e.g., no file uploaded, invalid file type).
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token).
 *       500:
 *         description: Internal server error during processing.
 */

/**
 * @openapi
 * /api/uploads/orders:
 *   post:
 *     summary: Upload a CSV file to ingest order data
 *     tags: [Data Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: CSV file containing order data. Headers should include customer_identifier (email or customer_external_id), items_description, total_amount, order_date (YYYY-MM-DD), and optionally order_external_id.
 *     responses:
 *       200:
 *         description: Orders file processed successfully. All records were processed without errors.
 *       207:
 *         description: Orders file processed with some errors (Multi-Status). Some records may have failed.
 *       400:
 *         description: Bad request (e.g., no file uploaded, customer not found for an order if you choose to make it a 400).
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */