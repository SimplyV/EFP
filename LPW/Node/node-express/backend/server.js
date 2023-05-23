const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());
const tasks = ['task 1' , 'task 2', 'task 3'];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  res.json(tasks[req.params.id])
});

app.post('/tasks', (req, res) => {
  const data = req.body
  tasks.push(data.task)
  res.json({ tasks })
});

app.listen(4500, () =>{
  console.log('Running at port 4500');
});
