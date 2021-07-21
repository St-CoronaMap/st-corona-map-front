import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import palette from "../../lib/styles/palette";
import seperateSecond from "../../lib/utils/seperateSecond";

export function CustomCounterLeft({ value, onPress, min, max }) {
   const onPressUp = () => {
      if (value + 1 <= max) {
         onPress(value + 1);
      }
   };
   const onPressDown = () => {
      if (value - 1 >= min) {
         onPress(value - 1);
      }
   };
   return (
      <View
         style={{
            width: 100,
            height: 70,
            flexDirection: "row",
            borderRadius: 10,
            borderWidth: 1,
            overflow: "hidden",
            backgroundColor: "white",
         }}>
         <View
            style={{
               width: 30,
               backgroundColor: palette.ivory,
               borderColor: palette.blackBerry,
               borderRightWidth: 1,
            }}>
            <Button
               type="clear"
               icon={{
                  name: "angle-up",
                  type: "font-awesome",
                  size: 20,
                  iconStyle: {
                     width: 15,
                  },
               }}
               raised
               underlayColor={palette.ivory}
               onPress={onPressUp}
               containerStyle={{
                  height: 35,
               }}
            />
            <Button
               type="clear"
               icon={{
                  name: "angle-down",
                  type: "font-awesome",
                  size: 20,
                  iconStyle: {
                     width: 15,
                  },
               }}
               raised
               underlayColor={palette.ivory}
               onPress={onPressDown}
               containerStyle={{
                  height: 35,
               }}
            />
         </View>
         <View
            style={{
               width: 70,
               justifyContent: "center",
            }}>
            <Text style={{ textAlign: "center" }}>{seperateSecond(value)}</Text>
         </View>
      </View>
   );
}

export function CustomCounterRight({ value, onPress, min, max }) {
   const onPressUp = () => {
      if (value + 1 <= max) {
         onPress(value + 1);
      }
   };
   const onPressDown = () => {
      if (value - 1 >= min) {
         onPress(value - 1);
      }
   };
   return (
      <View
         style={{
            width: 100,
            height: 70,
            flexDirection: "row",
            borderRadius: 10,
            borderWidth: 1,
            overflow: "hidden",
            backgroundColor: "white",
         }}>
         <View
            style={{
               width: 70,
               justifyContent: "center",
            }}>
            <Text style={{ textAlign: "center" }}>{seperateSecond(value)}</Text>
         </View>
         <View
            style={{
               width: 30,
               backgroundColor: palette.ivory,
               borderColor: palette.blackBerry,
               borderLeftWidth: 1,
            }}>
            <Button
               type="clear"
               icon={{
                  name: "angle-up",
                  type: "font-awesome",
                  size: 20,
                  iconStyle: {
                     width: 15,
                  },
               }}
               raised
               underlayColor={palette.ivory}
               onPress={onPressUp}
               containerStyle={{
                  height: 35,
               }}
            />
            <Button
               type="clear"
               icon={{
                  name: "angle-down",
                  type: "font-awesome",
                  size: 20,
                  iconStyle: {
                     width: 15,
                  },
               }}
               raised
               underlayColor={palette.ivory}
               onPress={onPressDown}
               containerStyle={{
                  height: 35,
               }}
            />
         </View>
      </View>
   );
}
