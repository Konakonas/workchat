
import workMessages from "./workChat.json";
import floodMessages from "./floodChat.json";
import { Message } from "./Message";

export const messages : Record<string, Message[]> = {
    work: workMessages,
    flood: floodMessages
}
