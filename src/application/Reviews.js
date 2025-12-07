import express from 'express';
import Review from '../infrastucture/entities/Reviews.js';
import Hotel from '../infrastucture/entities/Hotel.js';

// Create a new review old code
// const createReview = async (req, res) => {
//     try{
//         const reviewData = req.body;
//         if (!reviewData.rating || !reviewData.comment || !reviewData.hotelID) {
//             res.status(400).send("All fields are required !");
//             return;
//         }
//         //const newReview = new Review(reviewData);
//         //await newReview.save();
//         await Review.create(reviewData);
//         res.status(201).json(reviewData);
//         res.status(201).send("Review created successfully !");
//     }catch(error){
//         res.status(500).send(error.message);
//     }   
// };
// export { createReview };

// Create a new review
const createReview = async (req, res) => {
    try{
        const reviewData = req.body;
        if (!reviewData.rating || !reviewData.comment || !reviewData.hotelID) {
            res.status(400).send("All fields are required !");
            return;
        }

        const hotel = await Hotel.findById(reviewData.hotelID);
        if(!hotel){
            res.status(404).send("Hotel not found !");
            return;
        }

        const newReview = await Review.create( {rating: reviewData.rating, comment: reviewData.comment});
        hotel.reviews.push(newReview._id);
        await hotel.save();
        res.status(201).json(newReview);
    }catch(error){
        res.status(500).send(error.message);
    }
};
export { createReview };

// Get reviews by Hotel ID old code
// const getReviewsByHotelId = async (req, res) => {
//     try{
//         const hotelId = req.params.hotelID;
//         const hotel = await Review.find({ hotelID: hotelId });
//         if(!hotel){
//             res.status(404).send("No reviews found for this hotel !");
//             return;
//         }
//         const reviews = await Review.find({ hotelID: hotelId });
//         res.status(200).json(reviews);
//     }catch(error){
//         res.status(500).send(error.message);
//     }
// };
// export { getReviewsByHotelId };

// Get reviews by Hotel ID
const getReviewsByHotelId = async (req, res) => {
    try{
        const hotelId = req.params.hotelId;
        const hotel = await Hotel.findById(hotelId).populate('reviews');
        if(!hotel){
            res.status(404).send("No reviews found for this hotel !");
            return;
        }
        res.status(200).json(hotel.reviews);
    }catch(error){
        res.status(500).send(error.message);
    }
};
export { getReviewsByHotelId };
