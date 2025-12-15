import express from 'express';
import Hotel from '../infrastucture/entities/Hotel.js';
import e from 'express';
import { parse } from 'dotenv';


// In asynchronous operations, we interact with the database using Mongoose. no need to use the in-memory array for these operations.


// Data Retrieval async operations
export const getAllHotels = async (req,res) => {
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }catch(error){
        res.status(500).send("Server Error !");
    }
}

export const getHotelById = async (req , res) => {
    try{
    const ID = parseInt(req.params._id);
    const hotel = await Hotel.findById(ID);
    if(!hotel){
        res.status(404).send("Hotel not found !");
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
        res.status(400).send("All fields are required !");
        return;
    }
    await Hotel.create(newhotel);
    res.status(201).send("New hotel added successfully !");
    }catch(error){
        res.status(500).send(error.message);
    }   
}

// Data Update operations
export const updateHotel =  async (req,res) => {
    try{
        const _id = parseInt(req.params._id);
        const updatedHotel = req.body;
        if(!updatedHotel.name || !updatedHotel.image || !updatedHotel.location || !updatedHotel.rate || !updatedHotel.reviews || !updatedHotel.price){
            res.status(400).send("All fields are required !");
            return;
        }
        const hotel = await Hotel.findById(_id);
        if(!hotel){
            res.status(404).send("Hotel not found !");
            return;
        }
        await Hotel.findByIdAndUpdate(_id, updatedHotel);
        res.status(200).send("Hotel updated successfully !");
    }catch(error){
        res.status(500).send(error.message);
    }
}

export const patchHotel = async (req,res) => {
    try{
        const _id = parseInt(req.params._id);
        const hotelUpdates = req.body;
        if(!hotelUpdates.price){
            res.status(400).send("Price field is required for patching !");
            return;
        }
        const hotel = await Hotel.findById(_id);
        if(!hotel){
            res.status(404).send("Hotel not found !");
            return;
        }
        await Hotel.findByIdAndUpdate(_id, { price: hotelUpdates.price });
        res.status(200).send("Hotel price updated successfully !");

    }catch(error){
        res.status(500).send(error.message);
    }
}  

// Data Deletion operation
export const deleteHotel = async (req,res) => {
   try{
    const _id = parseInt(req.params._id);
    const hotel = await Hotel.findById(_id);
    if(!hotel){
        res.status(404).send("Hotel not found !");
        return;
    }
    await Hotel.findByIdAndDelete(_id);
    res.status(200).send("Hotel deleted successfully !");
   }catch(error){
    res.status(500).send(error.message);
   }
}