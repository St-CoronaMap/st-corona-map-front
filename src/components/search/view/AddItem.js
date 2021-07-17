import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import YoutubePlayer from "react-native-youtube-iframe";

import RangeSlider from "rn-range-slider";
import seperateSecond from "../../../lib/utils/seperateSecond";
import Label from "../../elements/Label";
import Notch from "../../elements/Notch";
import Rail from "../../elements/Rail";
import RailSelected from "../../elements/RailSelected";
import Thumb from "../../elements/Thumb";

function AddItem({
   item,
   playerRef,
   playing,
   togglePlaying,
   navigation,
   lapse,
   selectedLapsed,
   handleValueChange,
   endTime,
   setLoaded,
   setPlaying,
   setSelectedLapsed,
}) {
   const renderThumb = useCallback(() => <Thumb />, []);
   const renderRail = useCallback(() => <Rail />, []);
   const renderRailSelected = useCallback(() => <RailSelected />, []);
   const renderLabel = useCallback((value) => <Label text={value} />, []);
   const renderNotch = useCallback(() => <Notch />, []);

   return (
      <View style={styles.container}>
         <View style={styles.player}>
            <YoutubePlayer
               ref={playerRef}
               play={playing}
               forceAndroidAutoplay={true}
               height={9 * (Dimensions.get("window").width / 16)}
               videoId={item.id}
               onReady={() => {
                  setLoaded(true);
                  setPlaying(true);
               }}
               webViewStyle={{ backgroundColor: "black" }}
               initialPlayerParams={{
                  start: selectedLapsed[0],
                  end: selectedLapsed[1],
                  loop: true,
               }}
            />
         </View>
         <View style={styles.summaryContainer}>
            <Text style={{ padding: 10, fontSize: 25 }}>{item.title}</Text>
            <Text style={{ padding: 10 }}>
               {item.channelTitle}
               {"\t\t"}
               {item.publishedAt.slice(0, 10)}
            </Text>
            <Text style={{ padding: 10 }}>{item.description}</Text>
         </View>
         <View style={styles.lapseContainer}>
            <RangeSlider
               min={0}
               max={endTime}
               low={lapse[0]}
               high={lapse[1]}
               step={1}
               renderThumb={renderThumb}
               renderRail={renderRail}
               renderRailSelected={renderRailSelected}
               renderLabel={renderLabel}
               renderNotch={renderNotch}
               onValueChanged={handleValueChange}
            />
            <View
               style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
               }}>
               <Text>{seperateSecond(lapse[0])}</Text>
               <Button
                  title="적용"
                  containerStyle={{
                     position: "absolute",
                     width: 100,
                     left: "40%",
                  }}
                  type="outline"
                  onPress={() => setSelectedLapsed(lapse)}
               />
               <Text>{seperateSecond(lapse[1])}</Text>
            </View>
         </View>
         <View style={styles.control}>
            <Button
               title={"취소"}
               onPress={() => navigation.goBack()}
               type="outline"
               containerStyle={styles.controlButton}
               buttonStyle={{ height: 50 }}
            />
            <Button
               title={playing ? "pause" : "play"}
               onPress={togglePlaying}
               type="outline"
               containerStyle={styles.controlButton}
               buttonStyle={{ height: 50 }}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   summaryContainer: {
      flex: 3,
      borderBottomWidth: 0.5,
      borderRadius: 20,
   },
   lapseContainer: {
      flex: 6,
      alignContent: "center",
      padding: "10%",
   },
   control: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: 50,
      flexDirection: "row",
   },
   controlButton: {
      width: "50%",
   },
});

export default AddItem;
