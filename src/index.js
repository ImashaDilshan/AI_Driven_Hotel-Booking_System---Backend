import express from 'express';

const app = express(); 

app.use(express.json()); 

const HotelData = [
    {
        _id: 1,
        name: "Lotus 360 Hotel",
        image: "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000",
        location: "Colombo 02 ,Srilanka",
        rate: 4.0,
        reviews: [5],
        price: "$499"
    },
    {
        _id: 2,
        name: "The Grand Resort",
        image: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
        location: "Colombo 01 , Srilanka",
        rate: 5.0,
        reviews: [4],
        price: "$599"
       
    },
    {
        _id: 3,
        name: "Oceanview Retreat",
        image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?cs=srgb&dl=pexels-pixabay-261102.jpg&fm=jpg",
        location: "Jaar , Australia",
        rate: 4.5,
        reviews: [5],
        price: "$600"
    },
    {
        _id: 4,
        name: "Mountainview Lodge",
        image: "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",      
        location: "New Kottehe , Switzerland",
        rate: 3.7,
        reviews: [3],
        price: "$450"
    }
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