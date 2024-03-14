const express = require("express");
const morgan = require("morgan");


const app= new express();
app.use(morgan('dev'));
app.use(express.json());


//in memory storage for task
let tasks =[];
//routes
app.get('/',(req,res)=>{
    res.join(tasks);
})



//route to create new  task
app.post('/tasks',(req,res)=>{
    const  task = req.body
    tasks.push(task);
    res.send({message:"Tasks addedd",tasks})
})

//route to get task by id 
app.get('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const task = tasks.find(task=>task.id===id);
    if(!task){
        res.send("task not found");
    }else{
        res.json(task)
    }
});
app.listen(3005,(req,res)=>{
    console.log("port is up")
}) 
//update
app.put('/tasks/:id',(req,res)=>{
    const id =req.params.id;
    const updatedTask = req.body;
    const index = tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Tasks not found")
    }else{
        tasks.splice(index,1,updatedTask);
        //
        res.json(tasks)
    }

})

//delete
app.delete('/tasks/:id',(req,res)=>{
    const id =req.params.id;
    const index = tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Tasks not found")
    }else{
        tasks.splice(index,1);
        //
        res.json(tasks)
    }

})
