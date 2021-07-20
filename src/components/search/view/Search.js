import React from "react";
import { ScrollView, Platform, StyleSheet, View } from "react-native";
import { Button, ListItem, SearchBar, Image } from "react-native-elements";

const styles = StyleSheet.create({
   main: {
      flex: 1,
   },
   container: {
      backgroundColor: "#fff",
      flex: 1,
   },
   search: {
      width: "100%",
   },
   input: {
      width: "100%",
      color: "white",
      backgroundColor: "gray",
   },
   result: {
      width: "100%",
   },
   pagination: {
      width: "100%",
      flexDirection: "row",

      alignItems: "center",
      justifyContent: "flex-end",
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
      <View style={styles.container}>
         <View style={styles.search}>
            <SearchBar
               placeholder="Search"
               round
               loading={loading}
               platform="ios"
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
                        bottomDivider
                        key={idx}
                        onPress={() => onPressItem(item)}>
                        <Image
                           source={{ uri: item.thumbnails }}
                           style={{ width: 100, height: 100 }}
                           transition
                        />
                        <ListItem.Content>
                           <ListItem.Title>{item.title}</ListItem.Title>
                        </ListItem.Content>
                     </ListItem>
                  );
               })}
            </View>
         </ScrollView>
         <View style={styles.pagination}>
            <Button
               title="prev"
               onPress={() => onSearch("page", pageTokens[0])}
            />
            <Button
               title="next"
               onPress={() => onSearch("page", pageTokens[1])}
            />
         </View>
      </View>
   );
}

export default Search;
