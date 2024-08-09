import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

export class Agent {
    constructor(personality) {
        this.personality = personality;
        this.observations = [];
        this.actions = [];
        this.locations = [];
        this.planOfDay = "";
    }

    async simulateObservation(currentTime) {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "gpt-3.5-turbo",
          });
        
          console.log(completion.choices[0]);
    }

}