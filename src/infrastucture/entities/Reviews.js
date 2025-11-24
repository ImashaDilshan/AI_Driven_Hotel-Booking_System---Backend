import mongoose from "mongoose";

// Defining the review schema
const reviewSchema = new mongoose.Schema({

    rating : { type : Number, min : 0, max : 5, required : true },
    comment : { type : String, required : true },
    hotelID : { type : mongoose.Schema.Types.ObjectId, ref: "Hotel", required : true },
    //userID : { type : mongoose.Schema.Types.ObjectId, ref: "User", required : true },
    date : { type : Date, default : Date.now }

})
const Review = mongoose.model("Review", reviewSchema);
export default Review;