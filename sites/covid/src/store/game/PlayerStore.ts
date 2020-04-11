import { action, decorate, observable } from "mobx";
import { MessageTransport } from "../../webrtc/outcomeMessages";
import { Peer } from "./Peer";

export class PlayerStore {
  public id = "";
  public peer: Peer;

  constructor(private transport: MessageTransport) {
    this.peer = new Peer(this.transport);
  }

  public setUserId(id: string) {
    this.id = id;
  }
}

decorate(PlayerStore, {
  setUserId: action,
  id: observable
});
