import express from 'express';
import { getAllHotels, getHotelById, createHotel, updateHotel, patchHotel, deleteHotel  }  from '../application/hotel';
import isAuthenticated from './middlewar/authentication_middleware';
import isAdmin from './middlewar/authorization_middleware';
//import { Request, Response, NextFunction } from 'express';

const hotelRouter = express.Router();

// const preMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     console.log(req.method, req.url);
//     next();
// };


hotelRouter.route('/')
    .get(getAllHotels)
    .post(isAuthenticated,isAdmin, createHotel);

hotelRouter.route('/:_id')
    .get(isAuthenticated, getHotelById)
    .put(isAuthenticated, updateHotel)
    .patch(isAuthenticated, patchHotel)
    .delete(isAuthenticated, deleteHotel);

export default hotelRouter;