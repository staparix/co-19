import { runInAction } from "mobx";
import { RootStore } from "./game/RootStore";
import { MessageTransport } from "../webrtc/outcomeMessages";

export function createRootStore(transport: MessageTransport) {
  return runInAction(() => new RootStore(transport));
}
