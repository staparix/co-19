import React from "react";
import { RootStore } from "./store/game/RootStore";

export const RootStoreContext = React.createContext<RootStore | null>(null);

export function useGameStore() {
  const store = React.useContext(RootStoreContext);
  if (!store) {
    throw new Error("Game root store should be provided into RootStoreContext");
  }
  return store;
}
