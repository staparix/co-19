import { runInAction } from "mobx";
import { RootStore } from "./game/RootStore";

export function createRootStore() {
  return runInAction(() => new RootStore());
}
