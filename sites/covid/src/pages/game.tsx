import React from "react";
import { init } from "../webrtc";
import { observer } from "mobx-react";
import { useGameStore } from "../storeContext";

export default () => <GameComponent />

const GameComponent = observer(() => {
  const { gameStore } = useGameStore();
  console.log(gameStore);
  React.useEffect(() => {
    init();
  }, []);

  return (
    <div>
      Game {gameStore.name}
      <button onClick={() => {}}>Call</button>
    </div>
  );
});
