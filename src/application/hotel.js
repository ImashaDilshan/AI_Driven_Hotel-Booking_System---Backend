import express from 'express';
import Hotel from '../infrastucture/entities/Hotel.js';
import e from 'express';


// In asynchronous operations, we interact with the database using Mongoose. no need to use the in-memory array for these operations.
const HotelData = [
    {
        _id: 1,
        name: "Lotus 360 Hotel",
        image: "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000",
        location: "Colombo 02 ,Srilanka",
        rate: 4.0,
        reviews: [5],
        price: "$499"
    },
    {
        _id: 2,
        name: "The Grand Resort",
        image: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
        location: "Colombo 01 , Srilanka",
        rate: 5.0,
        reviews: [4],
        price: "$599"
       
    },
    {
        _id: 3,
        name: "Oceanview Retreat",
        image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?cs=srgb&dl=pexels-pixabay-261102.jpg&fm=jpg",
        location: "Jaar , Australia",
        rate: 4.5,
        reviews: [5],
        price: "$600"
    },
    {
        _id: 4,
        name: "Mountainview Lodge",
        image: "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",      
        location: "New Kottehe , Switzerland",
        rate: 3.7,
        reviews: [3],
        price: "$450"
    }
]


// Data Retrieval async operations
export const getAllHotels = async (req,res) => {
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }catch(error){
        res.status(500).send("Server Error");
    }
}

export const getHotelById = async (req , res) => {
    try{
    const ID = parseInt(req.params._id);
    const hotel = await Hotel.findById(ID);
    if(!hotel){
        res.status(404).send("Hotel not found");
        return;
    }
    res.status(200).json(hotel);
    }catch(error){
        res.status(500).send(error.message);
    }
}

//Data Creation async operation
export const createHotel = async (req,res) => {
    try{
    const newhotel = req.body;
    if(!newhotel.name || !newhotel.image || !newhotel.location || !newhotel.rate || !newhotel.reviews || !newhotel.price){
        res.status(400).send("All fields are required");
        return;
    }
    await Hotel.create(newhotel);
    res.status(201).send("New hotel added successfully");
    }catch(error){
        res.status(500).send(error.message);
    }   
}

// Data Update operations
export const updateHotel = (req,res) => {
    const ID = parseInt(req.params._id);
    const hotelIndex = HotelData.findIndex((h) => h._id === ID);
    if(hotelIndex === -1){
        res.status(404).send("Hotel not found");
    }
    const updatedData = req.body;
    const updatedHotel = {...HotelData[hotelIndex], ...updatedData};
    HotelData.splice(hotelIndex,1);
    HotelData.push(updatedHotel);
    res.status(200).send("Hotel updated successfully");
}

export const patchHotel = (req,res) => {
    const ID = parseInt(req.params._id);
    const hotel = HotelData.find((h) => h._id === ID);
    if(!hotel){
        res.status(404).send("Hotel not found");
    }
    const updatedData = req.body;
    hotel.price = updatedData.price ;
    res.status(200).send("Hotel price updated successfully");
}

// Data Deletion operation
export const deleteHotel = (req,res) => {
    const ID = parseInt(req.params._id);
    const hotelIndex = HotelData.findIndex((h) => h._id === ID);
    if(hotelIndex === -1){
        res.status(404).send("Hotel not found");
    }
    HotelData.splice(hotelIndex,1);
    res.status(200).send("Hotel deleted successfully");
}