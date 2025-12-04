import express from 'express';
import { getAllLocations, getLocationById, createLocation, updateLocation, patchLocation, deleteLocation } from '../application/location.js';

const locationRouter = express.Router();

locationRouter.route('/')
    .get(getAllLocations)
    .post(createLocation);

locationRouter.route('/:_id')
    .get(getLocationById)
    .put(updateLocation)
    .patch(patchLocation)
    .delete(deleteLocation);

export default locationRouter;
