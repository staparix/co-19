type SendOfferPayload = {
  offer: RTCSessionDescriptionInit;
  userId?: string;
};

type IceCandidatePayload = {
  iceCandidate: RTCIceCandidate;
  userId?: string;
};

export type MessageTransport = {
  createGame: () => void;
  sendOffer: (payload: SendOfferPayload) => void;
  sendAnswer: (payload: SendOfferPayload) => void;
  sendIceCandidate: (payload: IceCandidatePayload) => void;
};

export function createMessageTransport(ws: WebSocket): MessageTransport {
  function send(payload: any) {
    ws.send(JSON.stringify(payload));
  }

  return {
    sendOffer(payload: SendOfferPayload) {
      send({
        type: "offerRequest",
        payload: payload
      });
    },
    sendAnswer(payload: SendOfferPayload) {
      send({
        type: "answerRequest",
        payload: payload
      });
    },
    sendIceCandidate(payload: IceCandidatePayload) {
      send({
        type: "iceCandidate",
        payload: payload
      });
    },
    createGame() {
      send({
        hello: "ws server"
      });
    }
  };
}
