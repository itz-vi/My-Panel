// const express = require('express');
// const router = express.Router();
// const taskModel = require("./tasks")
// const path = require("path");
// const uploadsPath = path.join(__dirname, "uploads");
// router.use("/uploads", express.static(uploadsPath));
// const upload = require("./multer");


// router.get("/", async function (req, res) {
//   const tasks = await taskModel.find();
//   res.render("addtask", { tasks })
// });

// router.get("/addtask", async function (req, res) {
//   const tasks = await taskModel.find();
//   res.render('addtask', { tasks })
// });

// //  ----------------  Create Task --------------
// router.post('/addtask', upload.single("image"), async function (req, res) {
//   const { task, description, date } = req.body;
//   const imagefile = req.file ? req.file.filename : null;
//   const newtask = await taskModel.create({ task, description, date, image: imagefile })
//   const tasks = await taskModel.find();
//   res.render('alltask', { tasks })
// });

// router.get("/alltask", async function (req, res) {
//   const tasks = await taskModel.find();
//   res.render('alltask', { tasks })
// });

// //  --------------- Update user-----------------//rs
// router.get('/update/:id', async function (req, res) {
//   const task = await taskModel.findOne({ _id: req.params.id });
//   res.render('update', { task });
// });

// router.post('/updatetask/:id', async function (req, res) {
//   const { task, date, description } = req.body;
//   const newtask = await taskModel.findOneAndUpdate({ _id: req.params.id }, { task, date, description }, { new: true });
//   const tasks = await taskModel.find();
//   res.render('addtask', { tasks })
// });

// //  ----------------  Delete task --------------
// router.get("/delete/:id", async function (req, res) {
//   const id = req.params.id;
//   await taskModel.deleteOne({ _id: id });
//   const tasks = await taskModel.find();
//   res.redirect("/addtask");
// });

// module.exports = router;


const express = require('express');
const { format } = require('date-fns');
const router = express.Router();
const taskModel = require("./tasks");
const path = require("path");
const uploadsPath = path.join(__dirname, "uploads");
router.use("/uploads", express.static(uploadsPath));
const upload = require("./multer");

router.get("/", async function (req, res) {
  const tasks = await taskModel.find();
  const formattedTasks = tasks.map(t => ({
    ...t._doc,
    date: format(new Date(t.date), 'MMMM d, yyyy')
  }));
  res.render("addtask", { tasks: formattedTasks });
});

router.get("/addtask", async function (req, res) {
  const tasks = await taskModel.find();
  const formattedTasks = tasks.map(t => ({
    ...t._doc,
    date: format(new Date(t.date), 'MMMM d, yyyy')
  }));
  res.render('addtask', { tasks: formattedTasks });
});

//  ----------------  Create Task --------------
router.post('/addtask', upload.single("image"), async function (req, res) {
  const { task, description, date } = req.body;
  const imagefile = req.file ? req.file.filename : null;

  // Format the date before saving
  const formattedDate = format(new Date(date), 'MMMM d, yyyy');

  const newtask = await taskModel.create({ task, description, date: formattedDate, image: imagefile });
  const tasks = await taskModel.find();
  const formattedTasks = tasks.map(t => ({
    ...t._doc,
    date: format(new Date(t.date), 'MMMM d, yyyy')
  }));
  res.render('alltask', { tasks: formattedTasks });
});

router.get("/alltask", async function (req, res) {
  const tasks = await taskModel.find();
  const formattedTasks = tasks.map(t => ({
    ...t._doc,
    date: format(new Date(t.date), 'MMMM d, yyyy')
  }));
  res.render('alltask', { tasks: formattedTasks });
});

//  --------------- Update user-----------------//
router.get('/update/:id', async function (req, res) {
  const task = await taskModel.findOne({ _id: req.params.id });
  res.render('update', { task });
});

router.post('/updatetask/:id', async function (req, res) {
  const { task, date, description } = req.body;

  // Format the date before updating
  const formattedDate = format(new Date(date), 'MMMM d, yyyy');

  const newtask = await taskModel.findOneAndUpdate({ _id: req.params.id }, { task, date: formattedDate, description }, { new: true });
  const tasks = await taskModel.find();
  const formattedTasks = tasks.map(t => ({
    ...t._doc,
    date: format(new Date(t.date), 'MMMM d, yyyy')
  }));
  res.render('addtask', { tasks: formattedTasks });
});

//  ----------------  Delete task --------------
router.get("/delete/:id", async function (req, res) {
  const id = req.params.id;
  await taskModel.deleteOne({ _id: id });
  const tasks = await taskModel.find();
  const formattedTasks = tasks.map(t => ({
    ...t._doc,
    date: format(new Date(t.date), 'MMMM d, yyyy')
  }));
  res.redirect("/addtask");
});

module.exports = router;
