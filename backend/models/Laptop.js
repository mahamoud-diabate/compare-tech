const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const laptopSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    cpu_name: { type: String, required: false },
    gpu_name: { type: String, required: false },
    ram_gb: { type: Number, required: false },
    storage_gb: { type: Number, required: false },
    imageUrl: { type: String, required: false },
    geekbench_multi: { type: Number, required: false },
    geekbench_multi: { type: Number, required: false },
    display_brightness_nits: { type: Number, required: false },
    battery_life_hours: { type: Number, required: false },
    pros: [String],
    cons: [String]
});

const Laptop = mongoose.model('Laptop', laptopSchema);
module.exports = Laptop;