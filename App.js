import React from "react";

/*리덕스 */
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer, { rootSaga } from "./src/modules";

/*네비게이션 */

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import palette from "./src/lib/styles/palette";

/* Sentry */
import * as Sentry from "sentry-expo";
import { REACT_APP_SENTRY_DSN } from "@env";

Sentry.init({
   dsn: REACT_APP_SENTRY_DSN,
   enableInExpoDevelopment: false,
});

/* app loading */
import AppInit from "./AppInit";

/* logbox */
import { LogBox, Platform } from "react-native";

if (Platform.OS !== "web") {
   LogBox.ignoreLogs([
      "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
      "%s: Calling %s on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
   ]);
}

/*리덕스 */
const sagaMiddleware = createSagaMiddleware();
const store = __DEV__
   ? createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
     )
   : createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

/* 앱 함수 */
export default function App() {
   return (
      <SafeAreaProvider>
         <StatusBar />
         <SafeAreaView
            style={{
               flex: 1,
               alignItems: "center",
               justifyContent: "center",
               backgroundColor: palette.softGray,
            }}>
            <Provider store={store}>
               <AppInit />
            </Provider>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
