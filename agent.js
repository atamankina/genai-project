import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

export class Agent {
    constructor(personality) {
        this.personality = personality;
        this.observations = ["Es ist ein schöner Tag heute."];
        this.actions = ["Ich habe gerade einen leckeren Kaffee getrunken."];
        this.locations = [];
        this.planOfDay = "";
    }

    async simulateObservation(currentTime) {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: this.personality },
                { role: "user", content: `Stelle dir vor, du bist diese Person: ${this.personality}. Es ist ${currentTime} jetzt. Deine letzten Beobachtungen sind ${this.observations}. Deine letzten Handlungen sind ${this.actions}. Basierend darauf, was gerade passiert, was du gerade gemacht hast und deinen letzten Beobachtungen, beschreibe deine Beobachtungen zu diesem Zeitpunkt. Sei kurz, schreibe maximal 2 Sätze.` }
            ],
            model: "gpt-3.5-turbo",
          });
        
          console.log(completion.choices[0]);
    }

}