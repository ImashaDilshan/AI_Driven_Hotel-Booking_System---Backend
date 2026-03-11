import express from 'express';
import { getAllHotels, getHotelById, createHotel, updateHotel, patchHotel, deleteHotel  }  from '../application/hotel.js';
import isAuthenticated from './middlewar/authentication_middleware.js';

const hotelRouter = express.Router();


hotelRouter.route('/')
    .get( getAllHotels)
    .post( createHotel);

hotelRouter.route('/:_id')
    .get(isAuthenticated, getHotelById)
    .put(isAuthenticated, updateHotel)
    .patch(isAuthenticated, patchHotel)
    .delete(isAuthenticated, deleteHotel);

export default hotelRouter;