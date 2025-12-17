import mongoose from "mongoose";
import dotenv from "dotenv";
import Hotel from "./entities/Hotel.js";
import Review from "./entities/Reviews.js";
import { Location } from "./entities/location.js";
import connectDB from "./db.js";

dotenv.config();

const locationSeedData = [
    {
        name: "All"
    },
    {
        name: "Srilanka"
    },
    {
        name: "Australia"
    },
    {
        name: "Switzerland"
    }
];

const hotelSeedData = [
    {
        name: "Lotus 360 Hotel",
        image: "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000",
        location: "Colombo 02 ,Srilanka",
        rate: 4.0,
        description: "Experience luxury and comfort at Lotus 360 Hotel, where modern amenities meet exceptional service. Enjoy stunning city views, gourmet dining, and a relaxing spa during your stay.",
        price: "$499"
    },
    {
        name: "The Grand Resort",
        image: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
        location: "Colombo 01 , Srilanka",
        rate: 5.0,
        description: "The Grand Resort offers an unparalleled experience of elegance and sophistication. Indulge in world-class amenities, exquisite dining options, and breathtaking views that make every moment unforgettable.",
        price: "$599"
    },
    {
        name: "Oceanview Retreat",
        image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?cs=srgb&dl=pexels-pixabay-261102.jpg&fm=jpg",
        location: "Jaar , Australia",
        rate: 4.5,
        description: "Oceanview Retreat is your gateway to tranquility and natural beauty. Enjoy panoramic ocean views, luxurious accommodations, and a range of recreational activities designed to rejuvenate your mind and body.",
        price: "$600"
    },
    {
        name: "Mountainview Lodge",
        image: "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
        location: "New Kottehe , Switzerland",
        rate: 3.7,
        description: "Nestled in the heart of the mountains, Mountainview Lodge offers a perfect blend of rustic charm and modern comfort. Explore scenic trails, cozy up by the fireplace, and savor delicious cuisine amidst breathtaking landscapes.",
        price: "$450"
    }
];

const reviewSeedData = [
    { rating: 5, comment: "Exceptional service and stunning views! Highly recommend." },
    { rating: 4, comment: "Great experience overall. The staff was very helpful." },
    { rating: 5, comment: "Amazing resort with top-notch amenities. Worth every penny!" },
    { rating: 3, comment: "Good location but could improve on the facilities." }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Location.deleteMany({});
        await Hotel.deleteMany({});
        await Review.deleteMany({});
        console.log("Cleared existing location, hotel and review data");

        // Create locations
        const createdLocations = await Location.insertMany(locationSeedData);
        console.log(`Created ${createdLocations.length} locations`);

        // Create hotels
        const createdHotels = await Hotel.insertMany(hotelSeedData);
        console.log(`Created ${createdHotels.length} hotels`);

        // Create reviews and associate them with hotels
        const hotelReviewsMap = [
            { hotelIndex: 0, reviewData: reviewSeedData[0] },
            { hotelIndex: 1, reviewData: reviewSeedData[1] },
            { hotelIndex: 2, reviewData: reviewSeedData[2] },
            { hotelIndex: 3, reviewData: reviewSeedData[3] }
        ];

        const createdReviews = [];
        for (const mapping of hotelReviewsMap) {
            const review = await Review.create({
                rating: mapping.reviewData.rating,
                comment: mapping.reviewData.comment,
                hotelID: createdHotels[mapping.hotelIndex]._id
            });
            createdReviews.push(review);

            // Add review to hotel's reviews array
            await Hotel.findByIdAndUpdate(
                createdHotels[mapping.hotelIndex]._id,
                { $push: { reviews: review._id } },
                { new: true }
            );
        }

        console.log(`Created ${createdReviews.length} reviews`);
        console.log("\nSeed data successfully populated!");
        console.log("\nCreated Locations:");
        createdLocations.forEach((location, index) => {
            console.log(`${index + 1}. ${location.name} (ID: ${location._id})`);
        });
        console.log("\nCreated Hotels:");
        createdHotels.forEach((hotel, index) => {
            console.log(`${index + 1}. ${hotel.name} (ID: ${hotel._id})`);
        });

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error.message);
        process.exit(1);
    }
};

seedDatabase();
