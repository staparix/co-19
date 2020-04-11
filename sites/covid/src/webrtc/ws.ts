import * as Kefir from "kefir";
const wsUrl = "ws://localhost:5000";

export type IncomingMessages = {
  initUser: InitUserPayload;
  offerRequest: OfferRequestPayload;
  answerRequest: OfferRequestPayload;
  iceCandidate: IceCandidatePayload;
};

export type InitUserPayload = {
  payload: {
    userId: string;
  };
};

export type OfferRequestPayload = {
  payload: {
    userId: string;
    offer: RTCSessionDescriptionInit
  };
};

type IceCandidatePayload = {
  payload: {
    iceCandidate: RTCIceCandidate;
    userId: string;
  }
};

export type MessageTypes = keyof IncomingMessages;

export const createWSConnection = () => {
  console.log("init ws connection");
  const ws = new WebSocket(wsUrl);
  const incomeStream = Kefir.stream<unknown, any>(emitter => {
    ws.onopen = () => {
      console.log("client connected to ws...");
    };

    ws.onclose = () => {
      console.log("ws closed");
    };

    ws.onmessage = (message: MessageEvent) => {
      try {
        const payload = JSON.parse(message.data);
        if (payload.type === undefined) {
          emitter.emit(message);
        } else {
          emitter.emit({
            type: payload.type,
            payload: payload.payload
          });
        }
      } catch (e) {
        console.error("Could not parse message");
      }
    };
  });

  return {
    incomingMessages: incomeStream,
    ws: ws
  };
};
