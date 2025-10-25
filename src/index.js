import express from 'express';

const app = express(); 

app.use(express.json()); 

const hotels = [
    { id: 1, name: "Hotel Sunshine", location: "New York", rating: 4.5 },
    { id: 2, name: "Ocean View Resort", location: "California", rating: 4.7 },
    { id: 3, name: "Mountain Retreat", location: "Colorado", rating: 4.3 }
];

// Retrieving Data
app.get("/api/hotels", (req,res) => {   
    res.status(200).json(hotels);
});

app.get("/api/hotels/:id", (req, res) => {
    const h_id = parseInt(req.params.id);     // Extracting and converting id to integer
    const rqhotel  = hotels.find((h) => h.id === h_id);
    if(!rqhotel) {
        res.status(404).send("Hotel not found");
    } 
    res.status(200).json(rqhotel);
})

// Adding Data
app.post("/api/hotels", (req,res) => {
    const newHotel = req.body;
    newHotel.id = hotels.length + 1;
    if(!newHotel.name || !newHotel.location || !newHotel.rating) {               // Basic validation
        res.status(400).send("All fields are required: name, location, rating");
    }
    hotels.push(newHotel);
    res.status(201).send("Hotel added successfully");
})

// Updating Data
app.put("/api/hotels/:id", (req,res) => {
    const _id = parseInt(req.params.id);
    const Index = hotels.findIndex((h) => h.id === _id);
    if(Index === -1) {
        res.status(404).send("Hotel not found");
    }
    const updateData = req.body;          // Data to be updated
    const updateHotel = { ...hotels[Index], ...updateData }; // Merging existing data with new data
    hotels.splice(Index , 1);       // Removing old data
    hotels.push(updateHotel);     // Adding updated data
    res.status(200).send("Hotel updated successfully");
})

// Deleting Data
app.delete("/api/hotels/:id", (req, res) => {
    const _id = parseInt(req.params.id);
    const Index = hotels.findIndex((h) => h.id === _id);
    if(Index === -1) {
        res.status(404).send("Hotel not found");
    }
    hotels.splice(Index , 1);       // Removing hotel data
    res.status(200).send("Hotel deleted successfully");
})

const PORT = 8000;     
app.listen(PORT, () => {
    console.log("Server is listening on port : ", PORT);
});