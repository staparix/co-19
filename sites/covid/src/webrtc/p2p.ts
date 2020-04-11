export function createPeerConnection() {
  return new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun01.sipphone.com",
          "stun:stun.l.google.com:19302"
        ]
      }
    ]
  });
}
