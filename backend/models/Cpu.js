const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cpuSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    cores: {
        type: Number,
        required:true
    },
    brand:{
        type: String,
        required:true
    },
    threads:{
        type:Number,
        required:false
    },
    max_freq_ghz:{
        type:String,
        required:false
    },
    base_freq_ghz:{
        type:String,
        required:false
    }
});

const Cpu = mongoose.model('Cpu', cpuSchema);
module.exports = Cpu;