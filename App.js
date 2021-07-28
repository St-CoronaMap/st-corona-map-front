import React from "react";
import { ModalPortal } from "react-native-modals";
/*리덕스 */
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer, { rootSaga } from "./src/modules";

/*네비게이션 */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StatusBar } from "expo-status-bar";
import TopTabContainer from "./src/components/topTab/container/TopTabContainer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import palette from "./src/lib/styles/palette";
import PlayScreen from "./src/screens/Play";
import HeaderName from "./src/components/headerName/HeaderName";

/* Sentry */
import * as Sentry from "sentry-expo";
import { sentryDsn } from "./env";

Sentry.init({
   dsn: sentryDsn,
});

import { LogBox } from "react-native";

LogBox.ignoreLogs([
   "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
]);

/*리덕스 */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(rootSaga);

/* 네비게이션 관련 */
const Stack = createStackNavigator();

/* 앱 함수 */
export default function App() {
   return (
      <SafeAreaProvider>
         <StatusBar backgroundColor={palette.blackBerry} />
         <SafeAreaView style={{ flex: 1 }}>
            <HeaderName />
            <Provider store={store}>
               <NavigationContainer>
                  <Stack.Navigator mode="modal" initialRouteName="Main">
                     <Stack.Screen
                        name="Main"
                        component={TopTabContainer}
                        options={{ headerShown: false }}
                     />
                     <Stack.Screen
                        name="Play"
                        component={PlayScreen}
                        options={{
                           headerStatusBarHeight: 0,
                           title: "뒤로가기",
                           headerStyle: {
                              backgroundColor: palette.ivory,
                           },
                        }}
                     />
                  </Stack.Navigator>
               </NavigationContainer>
               <ModalPortal />
            </Provider>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
