import express from 'express';
import { getAllHotels, getHotelById, createHotel, updateHotel, patchHotel, deleteHotel  }  from '../application/hotel.js';

const hotelRouter = express.Router();


hotelRouter.route('/')
    .get(getAllHotels)
    .post(createHotel);

hotelRouter.route('/:_id')
    .get(getHotelById)
    .put(updateHotel)
    .patch(patchHotel)
    .delete(deleteHotel);

export default hotelRouter;