const express = require('express')
const app = express();
const mongoose = require('mongoose')

app.use(express.json())

// let todos = []

//DB Connection
mongoose.connect ('mongodb://localhost:27017/Mern_todos')
.then(()=>{
    console.log('DB Connected!')
})
.catch((err)=>{
    console.log(err)
})


//Schema
const todoSchema = new mongoose.Schema({
    tile: String,
    description: String
})


//Model
const todoModel = mongoose.model('Todo', todoSchema)

//create the items
app.post('/todos',(req,res)=>{
    const {title, description} = req.body 
    const newTodo = {
        id:todos.length + 1,
        title,
        description
    }
    todos.push(newTodo);
    console.log(todos);
    res.status(201).json(newTodo)
})

//Get all the items
app.get('/todos',(req, res)=>{
    res.json(todos)
})

const port = 3000
app.listen(port, ()=>{
    console.log("Server is running on port "+ port)
})





// [
//     {
//       id: 1,
//       title: 'Coding Practice',
//       description: 'Practicing the 5 code'
//     }
//   ]
//   [
//     {
//       id: 1,
//       title: 'Coding Practice',
//       description: 'Practicing the 5 code'
//     },
//     {
//       id: 2,
//       title: 'Web development practice',
//       description: 'Practicing web development'
//     }
//   ]
//   [
//     {
//       id: 1,
//       title: 'Coding Practice',
//       description: 'Practicing the 5 code'
//     },
//     {
//       id: 2,
//       title: 'Web development practice',
//       description: 'Practicing web development'
//     },
//     {
//       id: 3,
//       title: 'Learning Flutter',
//       description: 'Flutter application learning'
//     }
//   ]
  