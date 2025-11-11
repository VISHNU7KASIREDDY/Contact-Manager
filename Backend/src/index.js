const express =require('express')

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app=express()

app.use(express.json())

app.get('/contacts',async (req,res)=>{
    try{
        const data=await prisma.contacts.findMany()

        return res.status(200).json(data)
    }catch(err){
        console.log(err)
        return res.status(500).json({"message":"Internal Server Error"})
    }
})

app.get('/contacts/:name',async (req,res)=>{
    const {name}=req.params

    try{if (!name){
        return res.status(400).json({"message":"Name is required"})
    }else{
        const data=await prisma.contacts.findMany({
            where:{
                name: {
                    contains: name,
                  }
            }
        
        })
        if (data.length===0){
            return res.status(404).json({"message":"NO Contact found with that NAME "})
        }
        return res.status(200).json(data)
    }}catch(err){
        console.log(err)
        return res.status(500).json({"message":"Internal Server Error"})
    }
})

app.post('/contacts',async (req,res)=>{
    const {name,email,phone}=req.body

    try {if (!email){
        return res.status(400).json({"message":"Email required!! , Please enter!!"})
    }else if(!phone){
        return res.status(400).json({"message":"Phone required!! , Please enter!!"})
    }else{
        await prisma.contacts.create({
            data:{name,email,phone}
        })
        return res.status(201).json({"message":"Contact Created."})
    }}catch(err){
        console.log(err)
        return res.status(500).json({"message":"Internal Server Error"})
    }
})

app.delete('/contacts/:id',async (req,res)=>{
    const id = parseInt(req.params.id, 10);

    try{if (isNaN(id)){
        return res.status(400).json({"message":"Id is required"})
    }else{
        await prisma.contacts.delete({
            where:{id}
        })
        return res.status(200).json({"message":"Contact Deleted Successfully."})
    }}catch(err){
        console.log(err)
        return res.status(500).json({"message":err.message})
    }
})

app.put('/contacts/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const body = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID must be provided in URL (/contacts/:id)" });
    }

    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ message: "No Changes DONE!!" });
    }

    try {
        await prisma.contacts.update({
            where: { id },
            data: body
        });

        return res.status(200).json({ message: "Contact Updated Successfully." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



app.listen(3000,()=>{
    console.log("Server running on port 3000")
})