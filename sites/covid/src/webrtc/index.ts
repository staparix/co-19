import { configure } from "mobx";
import { createWSConnection } from "./ws";
import { createMessageHandler } from "./incomingMessages";
import { createRootStore } from "../store/createRootStore";
import { createMessageTransport } from "./outcomeMessages";

configure({
  enforceActions: "always"
});

export function init() {
  const { incomingMessages, ws } = createWSConnection();
  const messageTransport = createMessageTransport(ws);
  const rootStore = createRootStore(messageTransport);
  const handleMessages = createMessageHandler(rootStore);

  incomingMessages.onValue(handleMessages);

  return {
    rootStore: rootStore
  };
}
