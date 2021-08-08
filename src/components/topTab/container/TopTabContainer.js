import { useNavigationState } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopTab from "../view/TopTab";

function TopTabContainer() {
   const [swipeEnabled, setSwipeEnabled] = useState(true);
   const state = useNavigationState((state) => state.routes[0].state);
   const { signined } = useSelector(({ auth }) => auth);

   useEffect(() => {
      if (
         state?.index === 1 &&
         state.routes &&
         state.routes[1]?.state?.index === 1
      ) {
         setSwipeEnabled(false);
      } else {
         setSwipeEnabled(true);
      }
   }, [state]);

   return <TopTab swipeEnabled={swipeEnabled} signined={signined} />;
}

export default TopTabContainer;
