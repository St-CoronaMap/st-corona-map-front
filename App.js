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
import HeaderName from "./src/components/headerName/HeaderName";

/* Sentry */
import * as Sentry from "sentry-expo";
import { sentryDsn } from "./env";

Sentry.init({
   dsn: sentryDsn,
   enableInExpoDevelopment: true,
});

/* app loading */
import AppInit from "./AppInit";

/* logbox */
import { LogBox } from "react-native";

LogBox.ignoreLogs([
   "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
   "%s: Calling %s on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
]);

/*리덕스 */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(rootSaga);

/* 앱 함수 */
export default function App() {
   return (
      <SafeAreaProvider>
         <StatusBar backgroundColor={palette.blackBerry} />
         <SafeAreaView style={{ flex: 1 }}>
            <HeaderName />
            <Provider store={store}>
               <AppInit />
            </Provider>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
