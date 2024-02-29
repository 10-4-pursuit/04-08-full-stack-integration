import fs from'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// path to json file
const filePath = path.join(process.cwd(), 'data', 'task.json')

// Helper function to read data from json file
const readTask = async () =>{
    try{
        const data = await fs.readFile(filePath, 'utf-8')
        const tasks = JSON.parse(data).tasks
        return tasks
    }
    catch(err){
        console.log(err)
        return [];
    }
} 

//Helper function to write data to json file
const writeTask = async (tasks) =>{
    try{
        await fs.writeFile(filePath, JSON.stringify({tasks}, null, 2))
    }
    catch(err){
        console.log(err)
    }
}


//desc get all tasks
//route GET /api/tasks
//access public
export const getAllTasks = async (req, res, next) =>{
    const tasks = await readTask()
    res.status(200).json({tasks})
    next()
}

//desc create new task
//route POST /api/tasks
//access public
export const createTask = async (req, res, next) =>{
 try{
    const {title, description, status} = req.body
    const tasks = await readTask()
    const task = {
        id: uuidv4(),
        title,
        description,
        status
    }
    tasks.push(task)
    await writeTask(tasks)
    res.status(201).json({task})
    next()
 }
 catch(err){
    console.log(err)
 }
}

//desc get task by id
//route GET /api/tasks/:id
//access public
export const getTaskById = async (req, res, next) =>{
   try{
    const {id} = req.params
    const tasks = await readTask()
    const task = tasks.find((t) => t.id === id)
    if(!task){
        return res.status(404).json({message: 'Task not found'})
    }
    res.status(200).json({task})
    next()
   }catch(err){
    console.log(err)
   }
}

//desc update task
//route PUT /api/tasks/:id
//access public
export const updateTask = async (req, res, next) =>{
 try{
    const {id} = req.params
    const {title, description, status} = req.body
    const tasks = await readTask()
    const task = tasks.find((t) => t.id === id)
    if(!task){
        return res.status(404).json({message: 'Task not found'})
    }
    task.title = title
    task.description = description
    task.status = status
    await writeTask(tasks)
    res.status(200).json({task})
    next()
 }catch(err){
    console.log(err)
 }
}

//desc delete task
//route DELETE /api/tasks/:id
//access public
export const deleteTask = async (req, res, next) =>{
  try{
    const {id} = req.params
    const tasks = await readTask()
    const newTasks = tasks.filter((t) => t.id !== id)
    await writeTask(newTasks)
    res.status(200).json({message: 'Task deleted successfully'})
    next()
  }catch(err){
    console.log(err)
  }
}

