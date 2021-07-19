import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, View, Text } from "react-native";

function Home({ navigation }) {
   return (
      <View style={styles.container}>
         <View style={styles.content}>
            <Text>Home Screen</Text>
         </View>
         <View style={styles.login}>
            <Button
               title="Log in"
               onPress={() => navigation.navigate("Auth")}
            />
         </View>
         <View style={styles.login}>
            <Button
               title="Youtube"
               onPress={() => navigation.navigate("Youtube")}
            />
         </View>
         <View style={styles.login}>
            <Button
               title="Search"
               onPress={() => navigation.navigate("Search")}
            />
         </View>
         <View style={styles.login}>
            <Button
               title="Playlist"
               onPress={() => navigation.navigate("Playlist")}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
   content: {
      flex: 5,
      alignItems: "center",
      justifyContent: "center",
   },
   login: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
});

export default Home;
