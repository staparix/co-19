import { IncomingMessages, MessageTypes } from "./ws";
import { RootStore } from "../store/game/RootStore";

type Handlers = {
  [P in MessageTypes]: (
    args: IncomingMessages[P],
    rootStore: RootStore
  ) => void;
};

const handlers: Handlers = {
  initUser: ({ payload }, { currentPlayer }) => {
    console.log("[ws handler] handle init user", payload);
    currentPlayer.setUserId(payload.userId);
  },
  offerRequest: async ({ payload }, { currentPlayer }) => {
    console.log("[ws handler] handle offer", payload);
    await currentPlayer.peer.createAnswer(payload.offer);
  },
  answerRequest: async ({ payload }, { currentPlayer }) => {
    console.log("[ws handler] handle answer", payload);
    await currentPlayer.peer.setAnswer(payload.offer);
  },
  iceCandidate: async ({ payload }, { currentPlayer }) => {
    console.log("[ws handler] handle ice candidate", payload);
    await currentPlayer.peer.setIceCandidate(payload.iceCandidate);
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
