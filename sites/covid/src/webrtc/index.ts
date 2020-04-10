import { createWSConnection } from "./ws";
import { handleIncomingMessages } from "./incomingMessages";
export function init() {
    const wsStream = createWSConnection();

    wsStream.onValue(message => handleIncomingMessages(message))
}
