const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const schema = require("./Workout");

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        try {
            console.log("Server is running on port 8000");
        } catch (error) {
            console.log(error);
        }
    });
}).catch(() => {
    console.log(error);
});

app.get("/",async(req,res)=>{
    try {
        const data = await UserDetails.find();
        return res.status(200).send({message:"data fetched sucessfully",data});
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Something went wrong!"});
    }
});

app.post("/",async(req,res)=>{
    try {
        const {user,date,duration,name}=req.body;
        if(!user || !date || !duration || !name){
            return res.status(400).send({error:"Validation failed: [field] is required"});
        }

        const newUser = new UserDetails({
            user,date,duration,name
        });

        await newUser.save();

        return res.status(201).send({message:"Data added successfully",newUser});

    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"something went wrong"});
    }
});

app.put("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({message:"Please provide id as params"});
        }

        const {user,date,duration,name}=req.body;
        if(!user || !date || !duration || !name){
            return res.status(400).send({message:"please fill all fields"});
        }
        const updatedUser = await UserDetails.findByIdAndUpdate({_id:id},{user,date,duration,name});
        if(!updatedUser){
            return res.status(404).send({message:"Workout not found"});
        }
        return res.status(200).send({message:"Data updated successfully"});
    } catch (error) {
        return res.status(500).send({message:"something went wrong"});
    }
});

app.delete("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({message:"please send id as params"});
        }
        const deletedData = await UserDetails.findByIdAndDelete({_id:id});
        if(!deletedData){
            return res.status(404).send({message:"Workout not found"});
        }
        return res.status(200).send({message:"Data deleted successfully"});
    } catch (error) {
        return res.status(500).send({message:"something went wrong"});
    }
});