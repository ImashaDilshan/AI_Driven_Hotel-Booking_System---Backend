import { Request, Response, NextFunction } from "express";
import  openAI  from "openai";
import Hotel from "../infrastucture/entities/Hotel";

 const client = new openAI({
            apiKey: process.env.OPENAI_API_KEY || "API_KEY_NOT_FOUND",
        });

const massages: { role: "user" | "assistant", content: string }[] = []; // Conversation history stored in memory

const respondToAIQuery = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { query } = req.body;
        const DataSet = await Hotel.find(); // Fetch hotel data from MongoDB

        massages.push({ role: "user", content: query }); // Add user query to conversation history
        const response = await client.responses.create({
            model:"gpt-5",
            instructions: `you are a helpful assistant that helps users to choose a best hotel for a vibe they describe.
            the available hotels are given below.
            Based on that recommend them a hotel along with the informations:${JSON.stringify(DataSet)}.
            If the user query is not related to hotels, respond with I can only help with hotel recommendations.`,
            input: massages,
        });
        res.status(200).json(response);
        // ai response filtered to only include the text content
        const finalResponse = response.output
            .filter((item: any) => item.type === "message")
            .flatMap((item: any) => item.content)
            .filter((item: any) => item.type === "output_text")
            .map((item: any) => item.text)
            .join("\n");

        massages.push({ role: "assistant", content: finalResponse }); // Add AI response to conversation history
        console.log("AI Response:", finalResponse);
        console.log("Conversation History:", massages);
    } catch (error) {
        next(error);
    }
} 
export default respondToAIQuery;