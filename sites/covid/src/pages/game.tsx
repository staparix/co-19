import React from "react";
import { observer } from "mobx-react";
import { useGameStore } from "../storeContext";

export default () => <GameComponent />;

const GameComponent = observer(() => {
  const { gameStore, currentPlayer } = useGameStore();
  return (
    <div>
      Game {gameStore.name} <br />
      Your user id: {currentPlayer.id}
      <button onClick={() => currentPlayer.peer.createOffer()}>
        Create Game
      </button>
      <button onClick={() => currentPlayer.peer.send("Hello p2p connection")}>
        Send test data
      </button>
    </div>
  );
});
