import React from "react";

export const navigationRef = React.createRef();

export function goBack() {
   navigationRef.current?.goBack();
}
