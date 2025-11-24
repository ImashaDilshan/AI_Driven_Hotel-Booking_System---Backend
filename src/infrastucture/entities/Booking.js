import mongoose from "mongoose";

// Defining the Booking schema
const bookingSchema = new mongoose.Schema({

    userID : { type : mongoose.Schema.Types.ObjectId, ref : "User", required: true },
    hotelID : { type : mongoose.Schema.Types.ObjectId, ref : "Hotel", required: true },
    checkinDate : { type : Date, required: true },
    checkoutDate : { type : Date, required: true },
    roomNumber : { type : Number, required: true },
    pavementStatus : { type : String, enum : ["Pending","Paid","Cancelled"], default : "Pending" }

});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;