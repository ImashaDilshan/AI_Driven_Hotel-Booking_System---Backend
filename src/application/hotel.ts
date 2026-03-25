//import express from 'express';
//import e from 'express';
//import { parse } from 'dotenv';
import Hotel from '../infrastucture/entities/Hotel';
import NotFoundError from '../domain/errors/not_found_error';
import ValidationError from '../domain/errors/validation_error';
import { CreateHotelDTO } from '../domain/dtos/Hotel.dto';


import { Request,Response,NextFunction } from 'express';


// In asynchronous operations, we interact with the database using Mongoose. no need to use the in-memory array for these operations.


// Data Retrieval async operations
export const getAllHotels = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }catch(error){
        next(error); // Pass the error to the global error handler
    }
}

export const getHotelById = async (req: Request, res: Response, next: NextFunction) => {
    try{
    const ID = req.params._id;
    const hotel = await Hotel.findById(ID);
    if(!hotel){
        // res.status(404).send("Hotel not found !");
        throw new NotFoundError("Hotel not found !");
        return;
    }
    res.status(200).json(hotel);
    }catch(error){
        next(error); 
    }
}

//Data Creation async operation with validation using Zod DTO schema
export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
    try{
    const newhotel = req.body;
    const result = CreateHotelDTO.safeParse(newhotel);
    if (!result.success) {
        throw new ValidationError(`${result.error.message}`);
    }
    await Hotel.create(newhotel);
    res.status(201).send("New hotel added successfully !");
    }catch(error){
        next(error);
    }   
}

// Data Update operations
export const updateHotel =  async (req: Request, res: Response, next: NextFunction) => {
    try{
        const _id = req.params._id;
        const updatedHotel = req.body;
        if(!updatedHotel.name || !updatedHotel.image || !updatedHotel.location || !updatedHotel.rate || !updatedHotel.reviews || !updatedHotel.price){
            //res.status(400).send("All fields are required !");
            throw new ValidationError("All fields are required !");
            return;
        }
        const hotel = await Hotel.findById(_id);
        if(!hotel){
           // res.status(404).send("Hotel not found !");
            throw new NotFoundError("Hotel not found !");
            return;
        }
        await Hotel.findByIdAndUpdate(_id, updatedHotel);
        res.status(200).send("Hotel updated successfully !");
    }catch(error){
        next(error);
    }
}

export const patchHotel = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const _id = req.params._id;
        const hotelUpdates = req.body;
        if(!hotelUpdates.price){
            // res.status(400).send("Price field is required for patching !");
            throw new ValidationError("Price field is required for patching !");
            return;
        }
        const hotel = await Hotel.findById(_id);
        if(!hotel){
            // res.status(404).send("Hotel not found !");
            throw new NotFoundError("Hotel not found !");
            return;
        }
        await Hotel.findByIdAndUpdate(_id, { price: hotelUpdates.price });
        res.status(200).send("Hotel price updated successfully !");

    }catch(error){
        next(error);
    }
}  

// Data Deletion operation
export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
   try{
    const _id = req.params._id;
    const hotel = await Hotel.findById(_id);
    if(!hotel){
        // res.status(404).send("Hotel not found !");
        throw new NotFoundError("Hotel not found !");
        return;
    }
    await Hotel.findByIdAndDelete(_id);
    res.status(200).send("Hotel deleted successfully !");
   }catch(error){
    next(error);
   }
}