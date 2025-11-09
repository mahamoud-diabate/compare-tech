const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gpuSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true
    },
    cores:{
        type:Number,
        required:false
    },
    memory_gb:{
        type: Number,
        required:false
    },
    memory_type:{
        type:String,
        required:false
    }
});

const Gpu= mongoose.model('Gpu', gpuSchema);
module.exports=Gpu;