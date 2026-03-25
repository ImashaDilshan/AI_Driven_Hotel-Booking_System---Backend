import {z} from 'zod';

const CreateHotelDTO = z.object({
    name: z.string(),
    image: z.string(),
    location: z.string(),
    price: z.string(),
    description: z.string(),
})

export { CreateHotelDTO };