const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
    },
    variants: [
      {
        price: {
          type: Number,
          required: true,
        },
        stock:{
          type: Number,
          required: true,
        },
        size: {
          type: String,
        },
        color: {
          type: String,
        },

        images:[
          {
            type: String,
          },
        ],
        ram: {
          type: String,
        },
        storage: {
          type: String,
        },

      },
    ],
  },
  { timestamps: true },
);
module.exports = mongoose.model("productList", productSchema);
