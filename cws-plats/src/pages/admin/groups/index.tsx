import GroupPage from "@/components/admin/groups/GroupPage";
import { DefaultLayout } from "@/components/common";
import React from "react";

function Index() {
  return <GroupPage/>;
}

Index.title = "Reward Management";
Index.layout = DefaultLayout;


export default Index;
