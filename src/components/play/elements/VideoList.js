import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button, ListItem } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import seperateSecond from "../../../lib/utils/seperateSecond";
import DraggableFlatList from "react-native-draggable-flatlist";
import { CONTROLBAR_HEIGHT } from "../../../lib/styles/variables";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function VideoList({ playlist, changePlaylistOrder, onPressItem, cur }) {
   const renderItem = useCallback(
      ({ item, index, drag, isActive }) => {
         return (
            <ListItem.Swipeable
               key={index}
               underlayColor={palette.ivory}
               activeOpacity={0.5}
               onPress={() => onPressItem(index)}
               containerStyle={[styles(cur === index, isActive).listItem]}
               onLongPress={drag}>
               <Text>{index + 1}) </Text>
               <Image
                  source={{ uri: item.thumbnails }}
                  style={{ width: 100, height: 100 }}
                  transition
               />
               <ListItem.Content>
                  <ListItem.Title style={{ color: palette.blackBerry }}>
                     {item.title}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                     {seperateSecond(item.lapse[0])} ~{" "}
                     {seperateSecond(item.lapse[1])}
                  </ListItem.Subtitle>
               </ListItem.Content>
               <TouchableWithoutFeedback
                  style={{ width: 30, zIndex: 10 }}
                  onPress={() => console.log("pushed")}>
                  <ListItem.Chevron color="black" />
               </TouchableWithoutFeedback>
            </ListItem.Swipeable>
         );
      },
      [cur]
   );

   const listRef = useRef();

   useEffect(() => {
      listRef.current?.current?.scrollToIndex({
         index: cur,
         viewPosition: 0.5,
      });
   }, [cur]);

   return (
      <DraggableFlatList
         data={playlist.items}
         renderItem={renderItem}
         showsVerticalScrollIndicator={false}
         onRef={(ref) => {
            listRef.current = ref;
         }}
         showsHorizontalScrollIndicator={false}
         keyExtractor={(item, index) => `draggable-item-${index}`}
         onDragEnd={({ data, from, to }) => changePlaylistOrder(data, from, to)}
         containerStyle={{
            width: "100%",
            paddingBottom: 10,
            marginBottom: CONTROLBAR_HEIGHT,
         }}
         dragItemOverflow
      />
   );
}

const styles = (isCur, isActive) =>
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

         elevation: isActive ? 10 : 3,
      },
   });

export default React.memo(VideoList);
