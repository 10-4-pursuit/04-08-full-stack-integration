import express from 'express'
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/task.js'

const router = express.Router()

//desc get all tasks route
//route GET /api/tasks
//access public
router.get('/', getAllTasks)

//desc create new task route
//route POST /api/tasks
//access public
router.post('/', createTask)

//desc get task by id route
//route GET /api/tasks/:id
//access public
router.get('/:id', getTaskById)

//desc update task route
//route PUT /api/tasks/:id
//access public
router.put('/:id', updateTask)

//desc delete task route
//route DELETE /api/tasks/:id
//access public
router.delete('/:id', deleteTask)



export default router