import { IncomingMessages, MessageTypes } from "./ws";
import { RootStore } from "../store/game/RootStore";

type Handlers = {
  [P in MessageTypes]: (
    args: IncomingMessages[P],
    rootStore: RootStore
  ) => void;
};

const handlers: Handlers = {
  offer: ({ payload }) => {
    console.log("new offer ", payload);
  },
  "init.user": ({ payload }) => {
    console.log("create new user ", payload);
  }
};

export function createMessageHandler(rootStore: RootStore) {
  return (message: any) => {
    const handler = handlers[message?.type as MessageTypes];
    if (handler !== undefined) {
      handler(message, rootStore);
    } else {
      console.error("Unknown message ", message);
    }
  };
}
