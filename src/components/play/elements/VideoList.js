import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Text, Image, View, Platform } from "react-native";
import { Button, ListItem } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import seperateSecond from "../../../lib/utils/seperateSecond";
import DraggableFlatList from "react-native-draggable-flatlist";

import { WINDOW_WIDTH } from "../../../lib/styles/variables";
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
      listRef.current?.current?.scrollToIndex({
         index: cur,
         viewPosition: 0.5,
         useNativeDriver: true,
      });
   }, [cur, playlist]);

   const interpolations = playlist.items.map((item, index) => {
      const inputRange = [index - 0.3, index, index + 0.3];
      const translateX = listItemAnimation.interpolate({
         inputRange: inputRange,
         outputRange: [0, -170, 0],
         extrapolate: "clamp",
      });
      return { translateX };
   });

   const onReightPress = (index) => {
      listItemAnimation.setValue(index - 0.3);
      Animated.timing(listItemAnimation, {
         toValue: index,
         duration: 400,
         useNativeDriver: true,
      }).start();
   };
   const onCancleRight = (index) => {
      Animated.timing(listItemAnimation, {
         toValue: index - 0.3,
         duration: 400,
         useNativeDriver: true,
      }).start();
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
                     containerStyle={[styles(cur === index, isActive).listItem]}
                     onPress={() => onPressItem(index)}
                     onLongPress={drag}>
                     <Text>{index + 1}) </Text>
                     <Image
                        source={{ uri: item.thumbnail }}
                        style={{ width: 100, height: 100 }}
                        transition
                     />
                     <ListItem.Content>
                        <ListItem.Title style={{ color: palette.blackBerry }}>
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
                        onPress={() => onReightPress(index)}
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
                  onCancleRight={onCancleRight}
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

const styles = (isCur, isActive, buttonOffset) =>
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
         shadowRadius: 3.84,

         elevation: isActive ? 7 : 3,
      },
      buttonContainer: {
         position: "absolute",
         right: WINDOW_WIDTH * 0.05 + 50 * buttonOffset,
         height: "100%",
         paddingTop: 10,
         zIndex: -1,
      },
      draggableListContainer: {
         width: "100%",
         marginBottom: Platform.OS === "web" ? 0 : 30,
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
