const mongoose = require('mongoose');
const {Schema} = mongoose;

const subcategorySchema = new Schema({
    name: {
        type: String, 
        trim: true,
        required: true,
        lowercase: true, 
    }, 
    description: {
        type: String, 
        trim: true,
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }
})

module.exports = mongoose.model("SubCategory", subcategorySchema)

