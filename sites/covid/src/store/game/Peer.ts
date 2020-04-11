import { MessageTransport } from "../../webrtc/outcomeMessages";

export class Peer {
  private peerConnection: RTCPeerConnection;
  public rtcDataChanel: RTCDataChannel;
  constructor(private transport: MessageTransport) {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun3.l.google.com:19302" }]
    });
    this.rtcDataChanel = this.peerConnection.createDataChannel(
      "createDateChanel"
    );
    this.rtcDataChanel.onopen = () => console.log("onopen");
    this.rtcDataChanel.onclose = () => console.log("onclose");

    this.peerConnection.onconnectionstatechange = e => {
      console.log("onconnectionstatechange ", e);
    };
    this.peerConnection.ondatachannel = e => {
      const chanel = e.channel;
      chanel.onmessage = message => {
        console.log(message);
      };
      console.log("ondatachannel ", e);
    };
    this.peerConnection.onnegotiationneeded = e => {
      console.log("onnegotiationneeded ", e);
    };
    this.peerConnection.onicecandidateerror = e => {
      console.log("onicecandidateerror ", e);
    };
    this.peerConnection.onicecandidate = e => {
      console.log("on ice candidate ", e);
      if (e.candidate !== null) {
        this.transport.sendIceCandidate({
          iceCandidate: e.candidate
        });
      } else {
        console.debug("candidate not send ");
      }
    };
  }

  public async createOffer() {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.transport.sendOffer({ offer });
  }

  public async createAnswer(offer: RTCSessionDescriptionInit) {
    await this.peerConnection.setRemoteDescription(offer);

    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    this.transport.sendAnswer({
      offer: answer
    });
  }

  public async setAnswer(answerOffer: RTCSessionDescriptionInit) {
    await this.peerConnection.setRemoteDescription(answerOffer);
  }

  async setIceCandidate(iceCandidate: RTCIceCandidate) {
    await this.peerConnection.addIceCandidate(iceCandidate);
  }

  public send(text: string) {
    if (this.rtcDataChanel) {
      this.rtcDataChanel.send(text);
    }
  }
}
