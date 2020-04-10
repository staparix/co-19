import { PlayerStore } from "../player/PlayerStore";
import { action, decorate, observable } from "mobx";

export class GameStore {
  public name = "Scramber io";
  public players: PlayerStore[] = [];

  public addPlayer(player: PlayerStore) {
    this.players.push(player);
  }
}

decorate(GameStore, {
  name: observable,
  players: observable,
  addPlayer: action,
});
