import { action, decorate, observable } from "mobx";
import { MessageTransport } from "../../webrtc/outcomeMessages";
import { PlayerStore } from "./PlayerStore";

export class GameStore {
  public name = "Scramber io";
  public players: PlayerStore[] = [];

  constructor(
    private transport: MessageTransport,
  ) {}

  public addPlayer(player: PlayerStore) {
    this.players.push(player);
  }
}

decorate(GameStore, {
  name: observable,
  players: observable,
  addPlayer: action
});
