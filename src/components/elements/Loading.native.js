import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

function Loading({ loading }) {
   return (
      <Spinner
         visible={loading}
         cancelable={true}
         textContent={"Loading..."}
         textStyle={{
            color: "#FFF",
         }}
      />
   );
}

export default Loading;
