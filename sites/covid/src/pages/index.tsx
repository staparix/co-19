import * as React from "react";
import "../global.css";
import { MainLayout } from "../components/MainLayout";
import { GameContext } from "../storeContext";
import { createRootStore } from "../store/createRootStore";
import { RootStore } from "../store/game/RootStore";

export default () => (
  <>
      <MainLayout>
        <h1>Race</h1>
      </MainLayout>
  </>
);
