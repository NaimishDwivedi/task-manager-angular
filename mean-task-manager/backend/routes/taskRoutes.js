const express = require('express')


const { getTasks, createTask, updateTask, deleteTask, getTasksToEdit } = require('../controllers/taskController')


const router = express.Router()


router.get('/',getTasks)


router.get('/:taskId',getTasksToEdit)

router.post('/',createTask)

router.put('/:id', updateTask)

router.delete('/:id', deleteTask)


module.exports = router