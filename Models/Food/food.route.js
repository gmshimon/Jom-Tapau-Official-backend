const express = require('express')
const {
  postFood,
  getFood,
  deleteFood,
  getSingleFood,
  searchFood
} = require('./food.controller')
const router = express.Router()
const uploader = require('../../middleware/fileUpload/uploader')
const VerifyAdmin = require('../../middleware/VerifyAdmin')
const m2s = require('mongoose-to-swagger')
const Foods = require('./Food.modules')

const foodSchema = m2s(Foods)

/**
 * @swagger
 * /api/v1/foods:
 *   get:
 *     tags:
 *       - FOOD
 *     summary: Get all food
 *     description: Retrieve a list of food items.
 *     responses:
 *       200:
 *         description: List of food items successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food' # Reference to the Food schema
 *       500:
 *         description: Internal server error
 */

router.route('/').get(VerifyAdmin, getFood)

/**
 * @swagger
 * /api/v1/foods/{foodId}:
 *   get:
 *     tags:
 *       - FOOD
 *     summary: Get a food item by ID
 *     description: Retrieve a specific food item by its ID.
 *     parameters:
 *       - in: path
 *         name: foodId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the food item to retrieve.
 *     security:
 *       - BearerAuth: [] # Reference to the security scheme
 *     responses:
 *       200:
 *         description: Food item successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food' # Reference to the Food schema
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid
 *       404:
 *         description: Food item not found
 *       500:
 *         description: Internal server error
 * securitySchemes:
 *   BearerAuth: # Reference to the security scheme
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */

router.route('/:id').get(VerifyAdmin, getSingleFood)

/**
 * @swagger
 * /api/v1/foods/delete-food/{foodId}:
 *   delete:
 *     tags:
 *       - FOOD
 *     summary: Delete a food item by ID
 *     description: Delete a specific food item by its ID.
 *     parameters:
 *       - in: path
 *         name: foodId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the food item to delete.
 *     responses:
 *       204:
 *         description: Food item successfully deleted
 *       404:
 *         description: Food item not found
 *       500:
 *         description: Internal server error
 */

router.route('/delete-food/:id').delete(VerifyAdmin, deleteFood)

router.route('/search-food').post(VerifyAdmin, searchFood)

router.route('/post-food').post(VerifyAdmin, uploader.single('image'), postFood)

module.exports = router
