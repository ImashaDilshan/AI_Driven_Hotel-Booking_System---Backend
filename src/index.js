import express from 'express';
import hotelRouter from './api/hotel.js';

const app = express(); 

app.use(express.json()); 

app.use("/api/HotelData", hotelRouter);



// // Data Creation Endpoint
// app.post("/api/Hoteldata" ,(req,res) => {
//     const newhotel = req.body;
//     const ID = HotelData.length + 1;
//     newhotel._id = ID;
//     if(!newhotel.name || !newhotel.image || !newhotel.location || !newhotel.rate || !newhotel.reviews || !newhotel.price){
//         res.status(400).send("All fields are required");
//     }
//     HotelData.push(newhotel);
//     res.status(201).send("New hotel added successfully");   
// })

// // Data Retrieval Endpoint
// app.get("/api/HotelData",(req,res) => {
//     res.status(200).json(HotelData);
// })
// app.get("/api/HotelData/:_id",(req , res) => {
//     const ID = parseInt(req.params._id);
//     console.log("Retrieving hotel with ID:", req.params._id);
//     const hotel = HotelData.find((h) => h._id === ID);
//     if(!hotel){
//         res.status(404).send("Hotel not found");
//     }
//     res.status(200).json(hotel);
// });

// // Data Update Endpoint
// app.put("/api/HotelData/:_id",(req,res) => {
//     const ID = parseInt(req.params._id);
//     const hotelIndex = HotelData.findIndex((h) => h._id === ID);
//     if(hotelIndex === -1){
//         res.status(404).send("Hotel not found");
//     }
//     const updatedData = req.body;
//     const updatedHotel = {...HotelData[hotelIndex], ...updatedData};
//     HotelData.splice(hotelIndex,1);
//     HotelData.push(updatedHotel);
//     res.status(200).send("Hotel updated successfully");
// });
// app.patch("/api/HotelData/:_id",(req,res) => {
//     const ID = parseInt(req.params._id);
//     const hotel = HotelData.find((h) => h._id === ID);
//     if(!hotel){
//         res.status(404).send("Hotel not found");
//     }
//     const updatedData = req.body;
//     hotel.price = updatedData.price ;
//     res.status(200).send("Hotel price updated successfully");
// });

// // Data Deletion Endpoint
// app.delete("/api/HotelData/:_id",(req,res) => {
//     const ID = parseInt(req.params._id);
//     const hotelIndex = HotelData.findIndex((h) => h._id === ID);
//     if(hotelIndex === -1){
//         res.status(404).send("Hotel not found");
//     }
//     HotelData.splice(hotelIndex,1);
//     res.status(200).send("Hotel deleted successfully");
// })


const PORT = 8000;     
app.listen(PORT, () => {
    console.log("Server is listening on port : ", PORT);
});