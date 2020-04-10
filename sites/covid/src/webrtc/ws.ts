import * as Kefir from "kefir";
const wsUrl = "ws://localhost:5000";

export type IncomingMessages = {
  "init.user": InitUserPayload;
  offer: ClientOfferPayload;
};

export type InitUserPayload = {
  payload: {
    userId: string;
  };
};

export type ClientOfferPayload = {
  payload: {
    offer: { name: string };
  };
};

export type MessageTypes = keyof IncomingMessages;

export const createWSConnection = () => {
  console.log("init ws connection");
  const ws = new WebSocket(wsUrl);
  return Kefir.stream<unknown, any>(emitter => {
    ws.onopen = () => {
      console.log("client connected to ws...");
    };

    ws.onclose = () => {
      console.log("ws closed");
    };

    ws.onmessage = (message: MessageEvent) => {
      try {
        const payload = JSON.parse(message.data);
        emitter.emit({
          type: payload.type,
          payload: payload.data
        });
      } catch (e) {
        console.error("Could not parse message");
      }
    };
  });
};

export class Client {
  constructor(public id: string, private ws: WebSocket) {}

  public sendOffer(offer: RTCSessionDescriptionInit) {
    function createOfferWsMessage(data: RTCSessionDescriptionInit) {
      return JSON.stringify({
        type: "p2p.offer",
        data: data
      });
    }
    const wsOffer = createOfferWsMessage(offer);
    this.ws.send(wsOffer);
    console.log("offer send over ws");
  }
}
