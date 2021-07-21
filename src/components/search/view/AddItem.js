import React, { useCallback, useEffect, useState } from "react";
import {
   StyleSheet,
   View,
   Text,
   Dimensions,
   TextInputBase,
   TextInput,
} from "react-native";
import { Button } from "react-native-elements";
import YoutubePlayer from "react-native-youtube-iframe";

import RangeSlider from "rn-range-slider";
import Slider from "@react-native-community/slider";
import seperateSecond from "../../../lib/utils/seperateSecond";
import Label from "../../elements/Label";
import Notch from "../../elements/Notch";
import Rail from "../../elements/Rail";
import RailSelected from "../../elements/RailSelected";
import Thumb from "../../elements/Thumb";
import { ScrollView } from "react-native-gesture-handler";
import palette from "../../../lib/styles/palette";

function AddItem({
   item,
   playerRef,
   playing,
   lapse,
   selectedLapsed,
   handleValueChange,
   endTime,
   loaded,
   setLoaded,
   setPlaying,
   setSelectedLapsed,
   checkItem,
}) {
   const [vol, setVol] = useState(50);
   const renderThumb = useCallback(() => <Thumb />, []);
   const renderRail = useCallback(() => <Rail />, []);
   const renderRailSelected = useCallback(() => <RailSelected />, []);
   const renderLabel = useCallback((value) => <Label text={value} />, []);
   const renderNotch = useCallback(() => <Notch />, []);

   const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
   }, []);
   const applyLapse = useCallback(() => {
      setSelectedLapsed(lapse);
      setPlaying(false);
   }, [lapse]);
   const onReady = useCallback(() => {
      setLoaded(true);
      setPlaying(true);
   }, []);
   const onChangeState = useCallback(
      (e) => {
         if (e === "paused") {
            setPlaying(false);
         } else if (e === "playing") {
            setPlaying(true);
         } else if (e === "ended") {
            playerRef.current?.seekTo(selectedLapsed[0], true);
            setPlaying(true);
         }
      },
      [selectedLapsed]
   );
   return (
      <View style={styles.container}>
         <View>
            <YoutubePlayer
               ref={playerRef}
               play={playing}
               forceAndroidAutoplay={true}
               height={9 * (Dimensions.get("window").width / 16)}
               videoId={item.id}
               onReady={onReady}
               volume={vol}
               onChangeState={onChangeState}
               webViewStyle={{ backgroundColor: "black" }}
               initialPlayerParams={{
                  start: selectedLapsed[0],
                  end: selectedLapsed[1],
                  controls: false,
               }}
            />
         </View>
         <ScrollView>
            <View style={styles.summaryContainer}>
               <View style={styles.summaryBorder}>
                  <Text style={{ padding: 10, fontSize: 20 }}>
                     {item.title}
                  </Text>
                  <Text style={{ padding: 10, paddingBottom: 0 }}>
                     {item.channelTitle}
                     {"\t\t"}
                     {item.publishedAt.slice(0, 10)}
                  </Text>
               </View>
            </View>
            {loaded && (
               <View style={styles.lapseContainer}>
                  <View style={styles.sliderContainer}>
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
                           containerStyle={styles.applyButtonContainer}
                           buttonStyle={styles.applyButton}
                           titleStyle={styles.applyButtonTitle}
                           type="outline"
                           onPress={applyLapse}
                           raised
                        />
                        <Text>{seperateSecond(lapse[1])}</Text>
                     </View>
                  </View>
               </View>
            )}
         </ScrollView>
         <View style={styles.control}>
            <Slider
               style={{ width: 120 }}
               minimumValue={0}
               maximumValue={100}
               value={vol}
               thumbTintColor={palette.blackBerry}
               minimumTrackTintColor={palette.blackBerry}
               maximumTrackTintColor={palette.lightPink}
               onValueChange={(v) => setVol(v)}
            />
            <View style={styles.buttonContainer}>
               <Button
                  icon={{
                     name: `${playing ? "pause" : "play"}`,
                     type: "font-awesome",
                     color: palette.blackBerry,
                  }}
                  onPress={togglePlaying}
                  containerStyle={styles.pauseButton}
                  buttonStyle={styles.pauseButton}
                  raised
               />
            </View>
            <View style={styles.buttonContainer}>
               <Button
                  icon={{
                     name: "plus",
                     type: "font-awesome",
                  }}
                  containerStyle={styles.pauseButton}
                  buttonStyle={styles.pauseButton}
                  raised
                  onPress={checkItem}
               />
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: palette.ivory,
      borderColor: palette.deepCoolGray,
      borderLeftWidth: 1,
   },
   summaryContainer: {
      flex: 3,
   },
   summaryBorder: {
      paddingBottom: 10,
      borderBottomWidth: 0.5,
      borderRadius: 20,
   },
   lapseContainer: {
      flex: 6,
      alignContent: "center",
      paddingLeft: "10%",
      paddingRight: "10%",
      paddingTop: 0,
      paddingBottom: "10%",
   },
   applyButtonContainer: {
      width: 100,
      marginTop: 10,
   },
   applyButton: {
      backgroundColor: palette.redRose,
   },
   applyButtonTitle: {
      color: palette.blackBerry,
   },
   sliderContainer: {
      flex: 1,
   },
   pauseButton: {
      width: 60,
      height: 60,
      borderRadius: 35,
      backgroundColor: palette.deepRedRose,
   },
   buttonContainer: {
      width: 120,
      justifyContent: "flex-end",
      alignItems: "center",
   },
   control: {
      position: "absolute",
      bottom: 0,
      height: 80,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: palette.redRose,
   },
});

export default AddItem;
