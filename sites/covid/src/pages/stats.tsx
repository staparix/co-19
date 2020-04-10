import * as React from "react";
import { GlobalStats } from "../components/GlobalStats";
import { MainLayout } from "../components/MainLayout";

export default () => {
  return (
    <MainLayout>
      <h1>
        Global Statistics
      </h1>
        <GlobalStats />
    </MainLayout>
  );
};
