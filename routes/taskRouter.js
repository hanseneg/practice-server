const express = require('express')
const taskRouter = express.Router()
const { v4: uuid } = require('uuid')

const tasks = [
    {
        name: "task 1",
        description: "The description of the task",
        done: false,
        _id: uuid()
    }
]

//get all
taskRouter.get('/', (req, res) => {
    res.status(200)
    res.send(tasks)
})

//get one by id
taskRouter.get('/:id', (req, res, next) => {
    const taskId = req.params.id
    const foundTask = tasks.find(task => task._id === taskId)
    if(!foundTask){
        const error = new Error('The task was not found.')
        res.status(500)
        return next(error)
    }
    res.status(200).send(foundTask)
})

//post a new one
taskRouter.post('/', (req, res) => {
    const newTask = req.body
    newTask._id = uuid()
    tasks.push(newTask)
    res.status(201).send(`Successfully added ${newTask.name} to the database.`)
})

//update one with id
taskRouter.put('/:id', (req, res) => {
    const taskId = req.params.id
    const updatedObject = req.body
    const taskIndex = tasks.findIndex(task => task._id === taskId)
    const updatedTask = Object.assign(tasks[taskIndex], updatedObject)
    res.status(202).send(updatedTask)
})

//delete one by id
taskRouter.delete('/:id', (req, res) => {
    const taskId = req.params.id
    const taskIndex = tasks.findIndex(task => task._id === taskId)
    tasks.splice(taskIndex, 1)
    res.send('Successfully deleted the task.')
})

module.exports = taskRouter