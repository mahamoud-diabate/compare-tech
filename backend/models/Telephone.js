const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const telephoneSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    display_size:{
        type:String,
        required:false
    },
    cpu_name:{
        type:String,
        required:false
    },
    ram_gb:{
        type:Number,
        required:false
    },
    storage_gb:{
        type:Number,
        required:false
    },
    battery_mah:{
        type:Number,
        required:false
    }
    score: { type: Number, 
    required: false }
});

const Telephone=mongoose.model('Telephone',telephoneSchema);

module.exports=Telephone;