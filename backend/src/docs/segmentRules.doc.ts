/**
 * @openapi
 * tags:
 *   name: SegmentRules
 *   description: API for managing segment rules
 */

/**
 * @openapi
 * /api/segmentRules/create:
 *   post:
 *     summary: Create a new segment rule for the authenticated user
 *     tags: [SegmentRules]
 *     security:
 *       - bearerAuth: [] # Assuming bearerAuth is defined in your main swagger components
 *     responses:
 *       200:
 *         description: Segment rule created successfully.
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: User not authenticated.
 *       500:
 *         description: Internal server error.
 */


/**
 * @openapi
 * /api/segmentRules/getAllSegmentRules:
 *   get:
 *     summary: Retrieve all segment rules for the authenticated user
 *     tags: [SegmentRules]
 *     security:
 *       - bearerAuth: [] # Assuming bearerAuth is defined in your main swagger components
 *     responses:
 *       200:
 *         description: Segment rules fetched successfully.
 *       401:
 *         description: User not authenticated.
 *       404:
 *         description: No segment rules found.
 *       500:
 *         description: Internal server error.
 */