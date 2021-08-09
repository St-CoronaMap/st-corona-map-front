import React, { useCallback } from "react";
import { Text } from "react-native";
import { Dimensions, FlatList, Platform, StyleSheet, View } from "react-native";
import { ListItem, SearchBar, Image } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import { cutTitle } from "../../../lib/utils/cutTitle";

const styles = StyleSheet.create({
   main: {
      flex: 1,
   },
   container: {
      backgroundColor: palette.ivory,
      flex: 1,
   },
   search: {
      width: "100%",
      borderBottomWidth: 1,
      borderColor: palette.softGray,
   },
   input: {
      backgroundColor: palette.ivory,
      width: "100%",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
   },
   listItem: {
      backgroundColor: palette.ivory,
      height: 100,
      width: Platform.OS === "web" ? 540 : Dimensions.get("window").width * 0.9,
      overflow: "hidden",
      borderColor: palette.ivory,
      borderWidth: 1,
      borderRadius: 30,
      margin: 10,
      padding: 0,
      paddingRight: 5,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
   },
   result: {
      flex: 1,
      width: "100%",
      backgroundColor: palette.ivory,
      alignItems: "center",
   },
   image: { width: 20, height: 20, borderRadius: 10 },
   channelContainer: {
      height: 20,
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 10,
      opacity: 0.7,
   },
});

function Search({ onSearch, typing, onChange, result, onPressItem }) {
   const renderItem = useCallback(({ item, index }) => {
      return (
         <ListItem
            key={`${item.title}_${index}`}
            underlayColor={palette.ivory}
            activeOpacity={0.5}
            onPress={() => onPressItem(item)}
            containerStyle={styles.listItem}>
            <Image
               source={{ uri: item.thumbnail }}
               style={{ width: 100, height: 100 }}
               transition
            />
            <ListItem.Content>
               <ListItem.Title
                  style={{ color: palette.blackBerry, fontWeight: "500" }}>
                  {cutTitle(item.title)}
               </ListItem.Title>

               <View style={styles.channelContainer}>
                  <Image
                     source={{ uri: item?.channelAvatar }}
                     style={styles.image}
                     transition
                  />
                  <Text>
                     {"  "}
                     {item?.channelTitle}
                  </Text>
               </View>
            </ListItem.Content>
         </ListItem>
      );
   });
   return (
      <>
         <View style={styles.container}>
            <View style={styles.search}>
               <SearchBar
                  placeholder="검색"
                  round
                  platform="android"
                  containerStyle={styles.input}
                  onChangeText={onChange}
                  value={typing}
                  onSubmitEditing={onSearch}
               />
            </View>
            <View style={styles.result}>
               <FlatList
                  data={result}
                  keyExtractor={(item, index) => `${index}`}
                  renderItem={renderItem}
               />
            </View>
         </View>
      </>
   );
}

export default Search;
