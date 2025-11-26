/**
 * @openapi
 * tags:
 *   name: Campaigns
 *   description: API for managing campaigns
 */

/**
 * @openapi
 * /api/campaigns/create:
 *   post:
 *     summary: Create a new campaign for the authenticated user
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: [] # Assuming bearerAuth is defined in your main swagger components
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - ruleId
 *               - customerIds
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the campaign.
 *                 example: "Summer Sale Promotion"
 *               ruleId:
 *                 type: string
 *                 description: The ID of the segment rule to associate with this campaign.
 *                 example: "60d0fe4f5311236168a109ca"
 *               customerIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of customer IDs to target for this campaign.
 *                 example: ["60d0fe4f5311236168a109cb", "60d0fe4f5311236168a109cc"]
 *               message:
 *                 type: string
 *                 description: The message content for the campaign.
 *                 example: "Hi [Name], get 20% off on all summer items!"
 *               intent:
 *                 type: string
 *                 description: Optional intent of the campaign (e.g., promotion, win-back).
 *                 example: "promotion"
 *     responses:
 *       200:
 *         description: Campaign created successfully.
 *       400:
 *         description: Invalid input data. Please provide all required fields.
 *       401:
 *         description: User not authenticated.
 *       500:
 *         description: Internal server error.
 */