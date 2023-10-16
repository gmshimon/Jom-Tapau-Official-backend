const express = require('express')
const {
  postUser,
  loginUser,
  getMe,
  updateProfile
} = require('./user.controller')
const verifyToken = require('../../middleware/verifyToken')
const router = express.Router()

router.route('/update-profile/:id').put(verifyToken, updateProfile)
/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: User Sign-Up
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               phoneNumber:
 *                 type: string
 *                 description: The user's phone number.
 *               address:
 *                 type: string
 *                 description: The user's address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm the user's password.
 *       responses:
 *         201:
 *         description: User account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User' # Reference to the User schema
 *         400:
 *           description: Bad request - Invalid user data
 *         500:
 *           description: Internal server error
 */

router.route('/signup').post(postUser)
router.route('/login').post(loginUser)

router.route('/me').get(verifyToken, getMe)

module.exports = router
