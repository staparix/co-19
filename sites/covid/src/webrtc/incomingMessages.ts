import { IncomingMessages, MessageTypes, } from "./ws";

type Handlers = {
    [P in MessageTypes]: (args: IncomingMessages[P]) => void;
};

const handlers: Handlers = {
    "offer": ({ payload }) => {
        console.log("new offer ", payload)
    },
    "init.user": ({ payload }) => {
        console.log("create new user ", payload)
    }
};


export function handleIncomingMessages(message: any) {
    const handler = handlers[message?.type as MessageTypes];
    if(handler !== undefined) {
        handler(message);
    } else {
        console.error("Unknown message ", message);
    }
}

