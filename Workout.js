const mongoose = require("mongoose");

const UserDetails = mongoose.Schema({
    user:{type:String, required:true},
    date:{type:Date, required:true},
    duration:{type:Number, required:true},
    caloriesBurned:{type:Number}
});

const exercises = mongoose.Schema({
    name:{type:String, required:true},
    reps:{type:Number},
    duration:{type:Number, required:true},
    sets:{type:Number},
    weight:{type:Number}
});

const model = mongoose.model("models",UserDetails,exercises);

module.exports(model);