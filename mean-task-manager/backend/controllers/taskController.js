const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  // Access the userId from query parameters (GET request)
  const { userId } = req.query;

  // console.log("User ID from query:", userId);
  try {
    // Filter tasks based on userId
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.getTasksToEdit = async (req, res) => {
  // Access the userId from query parameters (GET request)
  const { taskId } = req.params;

  // console.log("Task ID from query:", taskId); 

  try {
    // Filter tasks based on userId
    const tasks = await Task.find({ _id: taskId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createTask = async (req, res) => {
  // console.log("request", req)
  const { title, description } = req.body;
  const userId = req.body.userId;

  // console.log("Data", title, description, userId);

  try {
    const newTask = new Task({ title, description, user: userId });

    // console.log(newTask);
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    // console.log("Task Id", req.params.id);

    // console.log("req params task id" ,req.params.id);
    

    const task = await Task.findById(req.params.id);

    console.log(task);
    

    // console.log("task id ", task.user.toString());

    // console.log("user id " ,req.user.toString())

    // console.log("user Id", req.body.user.id)

    // console.log(task);

    console.log(req.body);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // if (task.user.toString() !== req.user.toString())
    //   return res.status(403).json({ message: "Unauthorized" });

    const updatedTask = await Task.findByIdAndUpdate(req.params.id,  {
      title: req.body.taskname,  
      description: req.body.taskdescription, 
    },{
      new: true,
    });

    console.log(updatedTask);

    res.json(updatedTask);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Server Error", Error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // if (task.user.toString() !== req.user.id)
    //   return res.status(403).json({ message: "Unauthorized" });

    await task.deleteOne();

    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", Error: error.message });
  }
};
