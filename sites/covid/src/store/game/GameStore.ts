import { PlayerStore } from "../player/PlayerStore";
import { action, decorate, observable } from "mobx";
import { MessageTransport } from "../../webrtc/outcomeMessages";

export class GameStore {
  public name = "Scramber io";
  public players: PlayerStore[] = [];

  constructor(private transport: MessageTransport) {
  }

  public addPlayer(player: PlayerStore) {
    this.players.push(player);
  }

  public createGame() {
    this.transport.createGame();
  }
}

decorate(GameStore, {
  name: observable,
  players: observable,
  addPlayer: action
});
