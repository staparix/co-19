import React from "react";
import { RootStoreContext } from "./src/storeContext";
import { init } from "./src/webrtc";
let rootStore;
export const wrapRootElement = ({ element }) => (
  <RootStoreContext.Provider value={rootStore}>
    {element}
  </RootStoreContext.Provider>
);

export const onClientEntry = () => {
  console.log("We've started!");
  const initObj = init();

  rootStore = initObj.rootStore;
};
