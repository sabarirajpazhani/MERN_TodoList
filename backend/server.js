const express = require('express')
const app = express();
const mongoose = require('mongoose')

app.use(express.json())


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
    title: {
        type: String,
        required:true
    },
    description: String
})


//Model
const todoModel = mongoose.model('Todo', todoSchema)


//create the items
app.post('/todos',async(req,res)=>{
    const {title, description} = req.body 

    try{
        const newTodos = new  todoModel({title, description})
        await newTodos.save()
        res.status(201).json(newTodos)
    }
    catch{
        res.status(500).json(err,{
            message: "Internal Server error"
        })
    }
})


//Get all the items
app.get('/todos',async(req, res)=>{

    try{
        const todos = await todoModel.find()
        res.status(201).json(todos)
    }
    catch{
        res.status(500).json({
            message: "Internal server error"
        })
    }
})


//udpdate todo items

app.put('/todos/:id',async(req,res)=>{

    try{
        const {title, description} = req.body
        const id = req.params.id

        const updatedTodo = await todoModel.findByIdAndUpdate(
            id,
            {title, description},
            {new: true}
        )

        if(!updatedTodo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }

        res.status(202).json(updatedTodo)
    }
    catch{
        res.status(500).json({
            message:"Internal Server error"
        })
    }
})


//delete items
app.delete('/todos/:id', async(req, res)=>{
    try{
        const id = req.params.id 
        await todoModel.findByIdAndDelete(id)
        return res.status(204).json({
            message: "todo Successfuly deleted"
        })
    }
    catch{
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

   
const port = 8000
app.listen(port, ()=>{
    console.log("Server is running on port "+ port)
})




