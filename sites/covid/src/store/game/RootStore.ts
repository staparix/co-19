import { GameStore } from "./GameStore";
import { MessageTransport } from "../../webrtc/outcomeMessages";
import { PlayerStore } from "./PlayerStore";

export class RootStore {
  public gameStore: GameStore;
  public currentPlayer: PlayerStore;

  constructor(private transport: MessageTransport) {
    this.currentPlayer = new PlayerStore(this.transport);
    this.gameStore = new GameStore(this.transport);
  }
}
