import { GameStore } from "./GameStore";
import { MessageTransport } from "../../webrtc/outcomeMessages";

export class RootStore {
  public gameStore: GameStore;

  constructor(private transport: MessageTransport) {
    this.gameStore = new GameStore(this.transport);
  }
}
