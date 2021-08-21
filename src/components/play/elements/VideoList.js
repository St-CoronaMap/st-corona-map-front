import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import seperateSecond from "../../../lib/utils/seperateSecond";
import DraggableFlatList from "react-native-draggable-flatlist";

import { Animated } from "react-native";
import ButtonsForItem from "./ButtonsForItem";

function VideoList({
   playlist,
   changePlaylistOrder,
   onPressEditVideo,
   onPressDeleteVideo,
   onPressItem,
   cur,
}) {
   let listItemAnimation = new Animated.Value(-1);
   const listRef = useRef();

   useEffect(() => {
      listItemAnimation.setValue(-1);
      listRef.current?.current?.scrollToIndex({
         index: cur,
         viewPosition: 0.5,
         useNativeDriver: true,
      });
   }, [cur]);

   const interpolations = playlist.items.map((item, index) => {
      const inputRange = [index - 0.3, index, index + 0.3];
      const translateX = listItemAnimation.interpolate({
         inputRange: inputRange,
         outputRange: [0, -120, 0],
         extrapolate: "clamp",
      });
      return { translateX };
   });

   const onRightPress = (index) => {
      if (listItemAnimation.__getValue() === index) {
         onCancleRight(index);
      } else {
         listItemAnimation.setValue(index - 0.3);
         Animated.timing(listItemAnimation, {
            toValue: index,
            duration: 400,
            useNativeDriver: true,
         }).start(() => listItemAnimation.setValue(index));
      }
   };
   const onCancleRight = (index) => {
      Animated.timing(listItemAnimation, {
         toValue: index - 0.3,
         duration: 400,
         useNativeDriver: true,
      }).start(() => listItemAnimation.setValue(-1));
   };
   const onPressEdit = (index) => {
      onCancleRight(index);
      onPressEditVideo(index);
   };
   const onPressDelete = async (index, id) => {
      onCancleRight(index);
      await onPressDeleteVideo(index, id);
   };
   const renderItem = useCallback(
      ({ item, index, drag, isActive }) => {
         let shadow = {};
         if (isActive) {
            shadow = {
               shadowOffset: {
                  width: 0,
                  height: 7,
               },
               elevation: 7,
            };
         }
         return (
            <View>
               <Animated.View
                  style={{
                     transform: [
                        {
                           translateX: interpolations[index].translateX,
                        },
                     ],
                  }}>
                  <ListItem
                     key={index}
                     underlayColor={palette.ivory}
                     activeOpacity={0.5}
                     containerStyle={[styles(cur === index).listItem, shadow]}
                     onPress={() => onPressItem(index)}
                     onLongPress={drag}>
                     <Text>{index + 1}) </Text>
                     <Image
                        source={{ uri: item.thumbnail }}
                        style={{ width: 100, height: 100 }}
                        transition
                     />
                     <ListItem.Content>
                        <ListItem.Title
                           style={{
                              color: palette.blackBerry,
                              fontWeight: "500",
                           }}>
                           {item.title}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                           {seperateSecond(item.start)} ~{" "}
                           {seperateSecond(item.end)}
                        </ListItem.Subtitle>
                     </ListItem.Content>
                     <Button
                        containerStyle={stylesObj.chevronContainer}
                        onLongPress={drag}
                        onPress={() => onRightPress(index)}
                        buttonStyle={stylesObj.chevronButton}
                        icon={{
                           name: "chevron-right",
                           type: "font-awesome",
                           color: "gray",
                           size: 10,
                        }}
                     />
                  </ListItem>
               </Animated.View>
               <ButtonsForItem
                  onPressDelete={onPressDelete}
                  onPressEdit={onPressEdit}
                  index={index}
                  id={item.id}
               />
            </View>
         );
      },
      [cur, playlist]
   );

   return (
      <DraggableFlatList
         data={playlist?.items}
         renderItem={renderItem}
         onRef={(ref) => {
            listRef.current = ref;
         }}
         keyExtractor={(item, index) => "draggable-item-" + index}
         onDragEnd={changePlaylistOrder}
         containerStyle={styles().draggableListContainer}
         dragItemOverflow={true}
      />
   );
}

const styles = (isCur) =>
   StyleSheet.create({
      listItem: {
         backgroundColor: palette.ivory,
         height: 100,
         width: "90%",
         overflow: "hidden",
         borderColor: isCur ? palette.redRose : palette.ivory,
         borderWidth: isCur ? 3 : 1,
         borderRadius: 30,
         margin: 10,
         marginLeft: "5%",
         marginRight: "5%",
         padding: 0,
         paddingRight: 5,
         paddingLeft: 5,
         shadowColor: "#000",
         shadowOpacity: 0.25,
         shadowOffset: {
            width: 0,
            height: 2,
         },
         shadowRadius: 3.84,

         elevation: 3,
      },
      draggableListContainer: {
         width: "100%",
      },
   });

const stylesObj = StyleSheet.create({
   chevronContainer: { width: "10%" },
   chevronButton: {
      height: "100%",
      width: "100%",
      backgroundColor: palette.ivory,
   },
   buttonStyle: {
      height: 100,
      width: 50,
   },
});

export default React.memo(VideoList);
