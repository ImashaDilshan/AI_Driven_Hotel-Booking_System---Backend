import express from 'express';
import { getAllLocations, getLocationById, createLocation, updateLocation, patchLocation, deleteLocation } from '../application/location.js';
import isAuthenticated from './middlewar/authentication_middleware.js';


const locationRouter = express.Router();

locationRouter.route('/')
    .get( getAllLocations)
    .post( createLocation);

locationRouter.route('/:_id')
    .get(isAuthenticated, getLocationById)
    .put(isAuthenticated, updateLocation)
    .patch(isAuthenticated, patchLocation)
    .delete(isAuthenticated, deleteLocation);

export default locationRouter;
