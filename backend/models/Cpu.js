const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cpuSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    cores: { type: Number, required: true },
    threads: { type: Number, required: false },
    max_freq_ghz: { type: String, required: false },
    base_freq_ghz: { type: String, required: false },
    imageUrl: { type: String, required: false },
    geekbench_single: { type: Number, required: false },
    geekbench_multi: { type: Number, required: false },
    pros: [String],
    cons: [String]
});

const Cpu = mongoose.model('Cpu', cpuSchema);
module.exports = Cpu;