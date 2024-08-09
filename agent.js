import { getStream } from "./utils.js";

export class Agent {
    constructor(personality) {
        this.personality = personality;
        this.observations = ["Es ist ein schöner Tag heute."];
        this.actions = ["Ich habe gerade einen leckeren Kaffee getrunken."];
        this.locations = [];
        this.planOfDay = "";
    }

    async simulateObservation(currentTime) {

        const messages = [{ role: "system", content: this.personality },
            { role: "user", content: `Stelle dir vor, du bist diese Person: ${this.personality}. Es ist ${currentTime} jetzt. Deine letzten Beobachtungen sind ${this.observations.join(', ')}. Deine letzten Handlungen sind ${this.actions.join(', ')}. Basierend darauf, was gerade passiert, was du gerade gemacht hast und deinen letzten Beobachtungen, beschreibe deine Beobachtungen zu diesem Zeitpunkt. Sei kurz, schreibe maximal 2 Sätze.` }
        ];

        const observation = await getStream(messages);
        this.observations.push(observation);
    }

    async simulateAction(currentTime) {

        const messages = [{ role: "system", content: this.personality },
            { role: "user", content: `Stelle dir vor, du bist diese Person: ${this.personality}. Es ist ${currentTime} jetzt. Deine letzten Beobachtungen sind ${this.observations.join(', ')}. Deine letzten Handlungen sind ${this.actions.join(', ')}. Basierend darauf, was gerade passiert, was du gerade gemacht hast und deinen letzten Beobachtungen, was machst du als nächstes? Sei kurz, schreibe maximal 1 Satz.` }
        ];

        const action = await getStream(messages);
        this.actions.push(action);
    }
}