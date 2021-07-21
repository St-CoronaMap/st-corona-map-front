import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Platform, StyleSheet, View } from "react-native";
import { Button, ListItem, SearchBar, Image } from "react-native-elements";
import palette from "../../../lib/styles/palette";

const styles = StyleSheet.create({
   main: {
      flex: 1,
   },
   container: {
      backgroundColor: palette.ivory,
      flex: 1,
      borderColor: palette.blackBerry,
      borderLeftWidth: 1,
   },
   search: {
      width: "100%",
   },
   input: {
      width: "100%",
      backgroundColor: palette.ivory,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
   },
   listItem: {
      backgroundColor: palette.ivory,
      height: 100,
      width: "90%",
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
         height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 15,
   },
   result: {
      width: "100%",
      backgroundColor: palette.ivory,
      justifyContent: "center",
      alignItems: "center",
   },
   pagination: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
   },
   paginationButtonContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: palette.deepRedRose,
      marginBottom: 5,
      marginLeft: 10,
      marginRight: 10,
   },
   paginationButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: palette.deepRedRose,
   },
});

function Search({
   onSearch,
   typing,
   onChange,
   pageTokens,
   result,
   loading,
   onPressItem,
}) {
   return (
      <>
         <View style={styles.container}>
            <View style={styles.search}>
               <SearchBar
                  placeholder="검색"
                  round
                  loading={loading}
                  platform="android"
                  containerStyle={styles.input}
                  onChangeText={onChange}
                  value={typing}
                  onSubmitEditing={() => onSearch("search")}
               />
            </View>
            <ScrollView>
               <View style={styles.result}>
                  {result?.map((item, idx) => {
                     return (
                        <ListItem
                           key={idx}
                           underlayColor={palette.ivory}
                           activeOpacity={0.5}
                           onPress={() => onPressItem(item)}
                           containerStyle={styles.listItem}>
                           <Image
                              source={{ uri: item.thumbnails }}
                              style={{ width: 100, height: 100 }}
                              transition
                           />
                           <ListItem.Content>
                              <ListItem.Title
                                 style={{ color: palette.blackBerry }}>
                                 {item.title}
                              </ListItem.Title>
                           </ListItem.Content>
                        </ListItem>
                     );
                  })}
               </View>
            </ScrollView>
            <View style={styles.pagination}>
               {pageTokens[0] ? (
                  <Button
                     icon={{
                        name: "chevron-left",
                        type: "font-awesome",
                        color: palette.blackBerry,
                        size: 15,
                     }}
                     onPress={() => onSearch("page", pageTokens[0])}
                     containerStyle={styles.paginationButtonContainer}
                     buttonStyle={styles.paginationButton}
                     raised
                  />
               ) : (
                  <></>
               )}
               {pageTokens[1] ? (
                  <Button
                     icon={{
                        name: "chevron-right",
                        type: "font-awesome",
                        color: palette.blackBerry,
                        size: 15,
                     }}
                     onPress={() => onSearch("page", pageTokens[1])}
                     containerStyle={styles.paginationButtonContainer}
                     raised
                     buttonStyle={styles.paginationButton}
                  />
               ) : (
                  <></>
               )}
            </View>
         </View>
      </>
   );
}

export default Search;
