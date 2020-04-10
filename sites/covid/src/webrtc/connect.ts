import { Client, createWSConnection } from "../webrtc/ws";

let localConnection: RTCPeerConnection | null;
let remoteConnection: RTCPeerConnection | null;
let sendChannel: RTCDataChannel;
let receiveChannel: RTCDataChannel;
let ws: WebSocket;

export const init = async () => {
  try {
    const client = await createWSConnection();
    console.log("client created ", client.id);
    return {
      call: createCall(client)
    };
  } catch (e) {
    console.error("Could not create client ");
    throw new Error(e);
  }

  // ws.onmessage = (message: MessageEvent) => {
  //   if (typeof message.data === "string" && message.data[0] !== "{") {
  //     console.log("message from ws: ", message.data);
  //     return;
  //   }
  //   const parsedData = JSON.parse(message.data);
  //   switch (parsedData.type) {
  //     case "p2p.offer":
  //       handleOffer(parsedData.data);
  //       break;
  //   }
  // };
};

function createCall(client: Client) {
  return function call() {
    const localConnection = createConnection();
    const sendChannel = localConnection.createDataChannel("sendChanel");
    sendChannel.onopen = onSendChannelStateChange;
    sendChannel.onclose = onSendChannelStateChange;

    localConnection.createOffer().then(desc => {
      console.log("local connection offer created");
      localConnection.setLocalDescription(desc);
      client.sendOffer(desc);
    }, onCreateSessionDescriptionError);
  };
}

export function tempStay() {
  // localConnection.onicecandidate = e => {
  //   console.log("local connection ice candidate");
  //   onIceCandidate(localConnection, e);
  // };
}

function createConnection() {
  const servers = undefined;
  return new RTCPeerConnection(servers);
}

function handleOffer(offer: any) {
  console.log("client have offer from other browser...");
  console.log(offer);

  const remoteConnection = createConnection();
  remoteConnection.setRemoteDescription();
}

// @ts-ignore
function createConnection2() {
  ws.send(JSON.stringify({ name: "Hello" }));
  const servers = undefined;
  localConnection = new RTCPeerConnection(servers);
  console.log("Created local peer connection object localConnection");

  sendChannel = localConnection.createDataChannel("sendDataChannel");
  console.log("Created send data channel");

  localConnection.onicecandidate = e => {
    onIceCandidate(localConnection!, e);
  };
  sendChannel.onopen = onSendChannelStateChange;
  sendChannel.onclose = onSendChannelStateChange;

  remoteConnection = new RTCPeerConnection(servers);
  console.log("Created remote peer connection object remoteConnection");

  remoteConnection.onicecandidate = e => {
    onIceCandidate(remoteConnection!, e);
  };
  remoteConnection.ondatachannel = receiveChannelCallback;

  localConnection
    .createOffer()
    .then(gotDescription1, onCreateSessionDescriptionError);
}

function onCreateSessionDescriptionError(error: object) {
  console.log("Failed to create session description: " + error.toString());
}

function sendData() {
  sendChannel.send("Some data");
  console.log("Sent Data: " + "Send test file");
}

function closeDataChannels() {
  console.log("Closing data channels");
  sendChannel.close();
  console.log("Closed data channel with label: " + sendChannel.label);
  receiveChannel.close();
  console.log("Closed data channel with label: " + receiveChannel.label);
  localConnection!.close();
  remoteConnection!.close();
  localConnection = null;
  remoteConnection = null;
  console.log("Closed peer connections");
}

function gotDescription1(desc: RTCSessionDescriptionInit) {
  ws.send("offer created");
  localConnection!.setLocalDescription(desc);
  const wsOffer = createOfferWsMessage(desc);
  ws.send(wsOffer);

  console.log(`Offer from localConnection\n${desc.sdp}`);
  remoteConnection!.setRemoteDescription(desc);
  remoteConnection!
    .createAnswer()
    .then(gotDescription2, onCreateSessionDescriptionError);
}

function gotDescription2(desc: RTCSessionDescriptionInit) {
  remoteConnection!.setLocalDescription(desc);
  console.log(`Answer from remoteConnection\n${desc.sdp}`);
  localConnection!.setRemoteDescription(desc);
}

function getOtherPc(pc: RTCPeerConnection) {
  return pc === localConnection ? remoteConnection : localConnection;
}

function getName(pc: RTCPeerConnection) {
  return pc === localConnection
    ? "localPeerConnection"
    : "remotePeerConnection";
}

function onIceCandidate(
  pc: RTCPeerConnection,
  event: RTCPeerConnectionIceEvent
) {
  getOtherPc(pc)!
    .addIceCandidate(event.candidate!)
    .then(
      () => onAddIceCandidateSuccess(pc),
      (err: object) => onAddIceCandidateError(err)
    );
  console.log(
    `${getName(pc)} ICE candidate: ${
      event.candidate ? event.candidate.candidate : "(null)"
    }`
  );
}

function onAddIceCandidateSuccess(canditate: RTCPeerConnection) {
  console.log("AddIceCandidate success.", canditate);
}

function onAddIceCandidateError(error: object) {
  console.log(`Failed to add Ice Candidate: ${error.toString()}`);
}

function receiveChannelCallback(event: RTCDataChannelEvent) {
  console.log("Receive Channel Callback");
  receiveChannel = event.channel;
  receiveChannel.onmessage = onReceiveMessageCallback;
  receiveChannel.onopen = onReceiveChannelStateChange;
  receiveChannel.onclose = onReceiveChannelStateChange;
}

function onReceiveMessageCallback(event: MessageEvent) {
  console.log("Received Message ", event.data);
}

function onSendChannelStateChange() {
  const readyState = sendChannel.readyState;
  console.log("Send channel state is: " + readyState);
  if (readyState === "open") {
  } else {
  }
}

function onReceiveChannelStateChange() {
  const readyState = receiveChannel.readyState;
  console.log(`Receive channel state is: ${readyState}`);
}
