import express from 'express';
import { getAllLocations, getLocationById, createLocation, updateLocation, patchLocation, deleteLocation } from '../application/location';
import isAuthenticated from './middlewar/authentication_middleware';


const locationRouter = express.Router();

locationRouter.route('/')
    .get(getAllLocations)
    .post(isAuthenticated, createLocation);

locationRouter.route('/:_id')
    .get(isAuthenticated, getLocationById)
    .put(isAuthenticated, updateLocation)
    .patch(isAuthenticated, patchLocation)
    .delete(isAuthenticated, deleteLocation);

export default locationRouter;
