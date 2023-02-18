import RewardPage from "@/components/admin/rewards/RewardPage";
import { DefaultLayout } from "@/components/common";
import React from "react";

function Index() {
  return <RewardPage  />;
}

Index.title = "Reward Management";
Index.layout = DefaultLayout;


export default Index;
