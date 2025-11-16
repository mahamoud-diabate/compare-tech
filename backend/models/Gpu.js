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
    },
    benchmark_3dmark: { type: Number,
    required: false 
    },
    pros:[String],
    cons:[String]
});

const Gpu= mongoose.model('Gpu', gpuSchema);
module.exports=Gpu;