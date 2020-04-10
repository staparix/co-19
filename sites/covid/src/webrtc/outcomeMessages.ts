export type MessageTransport = {
  createGame: () => void;
};

export function createMessageTransport(ws: WebSocket): MessageTransport {
  function send(payload: any) {
    ws.send(JSON.stringify(payload));
  }

  return {
    createGame() {
      send({
        hello: "ws server"
      });
    }
  };
}
