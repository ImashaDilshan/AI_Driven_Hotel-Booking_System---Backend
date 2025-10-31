import mongoose from "mongoose";

// Defining the Hotel schema
const hotelSchema = new mongoose.Schema({

    name : { type: String, required: true },
    image : { type: String, required: true },
    location : { type: String, required: true },
    rate : { type: Number, min: 1, max: 5 },
    reviews : { type: Number },
    price : { type: Number, required: true }

})

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;