import { GameStore } from "./GameStore";

export class RootStore {
    public gameStore: GameStore;

    constructor() {
        this.gameStore = new GameStore();
    }
}
