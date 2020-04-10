import React from "react";
import { observer } from "mobx-react";
import { useGameStore } from "../storeContext";

export default () => <GameComponent />;

const GameComponent = observer(() => {
  const { gameStore } = useGameStore();
  return (
    <div>
      Game {gameStore.name}{" "}
      <button onClick={() => gameStore.createGame()}>Create Game</button>
    </div>
  );
});
