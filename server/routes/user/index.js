import express from 'express'
import {
  getAllUsers,
  getUserById,
  putUser,
  deleteUser,
} from './controller'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.put('/:id', putUser)
router.delete('/:id', deleteUser)

export default router
