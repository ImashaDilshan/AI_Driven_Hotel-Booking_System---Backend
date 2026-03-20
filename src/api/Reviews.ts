import express from 'express';
import { createReview , getReviewsByHotelId } from '../application/Reviews';
//import { get } from 'mongoose';

const reviewRouter = express.Router();

// Route to create a new review
reviewRouter.post('/', createReview); 

// Get Review from Selected Hotel
reviewRouter.get('/hotel/:hotelId',getReviewsByHotelId);
export default reviewRouter;
