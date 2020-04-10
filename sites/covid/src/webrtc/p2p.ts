function createConnection() {
  const servers = undefined;
  return new RTCPeerConnection(servers);
}

async function createOffer() {
  const peerConnection = createConnection();
  try {
    const descriptionInit = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(descriptionInit);
    return descriptionInit;
  } catch (e) {
    console.error(" Couldn't create offer ");
  }
}
