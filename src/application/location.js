import { Location } from '../infrastucture/entities/location.js';

// Data Retrieval async operations
export const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).send("Server Error !");
    }
}

export const getLocationById = async (req, res) => {
    try {
        const ID = req.params._id;
        const location = await Location.findById(ID);
        if (!location) {
            res.status(404).send("Location not found !");
            return;
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Data Creation async operation
export const createLocation = async (req, res) => {
    try {
        const newLocation = req.body;
        if (!newLocation.name) {
            res.status(400).send("Location name is required !");
            return;
        }
        await Location.create(newLocation);
        res.status(201).send("New location added successfully !");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Data Update operations
export const updateLocation = async (req, res) => {
    try {
        const _id = req.params._id;
        const updatedLocation = req.body;
        if (!updatedLocation.name) {
            res.status(400).send("Location name is required !");
            return;
        }
        const location = await Location.findById(_id);
        if (!location) {
            res.status(404).send("Location not found !");
            return;
        }
        await Location.findByIdAndUpdate(_id, updatedLocation);
        res.status(200).send("Location updated successfully !");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const patchLocation = async (req, res) => {
    try {
        const _id = req.params._id;
        const locationUpdates = req.body;
        if (!locationUpdates.name) {
            res.status(400).send("Location name is required for patching !");
            return;
        }
        const location = await Location.findById(_id);
        if (!location) {
            res.status(404).send("Location not found !");
            return;
        }
        await Location.findByIdAndUpdate(_id, { name: locationUpdates.name });
        res.status(200).send("Location name updated successfully !");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Data Deletion operation
export const deleteLocation = async (req, res) => {
    try {
        const _id = req.params._id;
        const location = await Location.findById(_id);
        if (!location) {
            res.status(404).send("Location not found !");
            return;
        }
        await Location.findByIdAndDelete(_id);
        res.status(200).send("Location deleted successfully !");
    } catch (error) {
        res.status(500).send(error.message);
    }
}
