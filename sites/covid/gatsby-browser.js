import React from "react";
import { RootStoreContext } from "./src/storeContext";
import { createRootStore } from "./src/store/createRootStore";

export const wrapRootElement = ({ element }) => (
  <RootStoreContext.Provider value={createRootStore()}>
    {element}
  </RootStoreContext.Provider>
);
