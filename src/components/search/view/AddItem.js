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
         <View style={styles.player}>
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
         <View style={styles.summaryContainer}>
            <View style={styles.summaryBorder}>
               <Text style={{ padding: 10, fontSize: 25 }}>{item.title}</Text>
               <Text style={{ padding: 10 }}>
                  {item.channelTitle}
                  {"\t\t"}
                  {item.publishedAt.slice(0, 10)}
               </Text>
               <Text style={{ padding: 10, color: "gray" }}>
                  {item.description}
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
                        containerStyle={{
                           width: 100,
                           marginTop: 10,
                        }}
                        type="outline"
                        onPress={applyLapse}
                     />
                     <Text>{seperateSecond(lapse[1])}</Text>
                  </View>
               </View>
               <View style={styles.pauseButtonContainer}>
                  <Slider
                     style={{ width: 100, height: 100 }}
                     minimumValue={0}
                     maximumValue={100}
                     value={vol}
                     thumbTintColor="black"
                     minimumTrackTintColor="red"
                     maximumTrackTintColor="#000000"
                     onValueChange={(v) => setVol(v)}
                  />
                  <Button
                     icon={{
                        name: `${playing ? "pause" : "play"}`,
                        type: "font-awesome",
                     }}
                     containerStyle={styles.pauseButton}
                     buttonStyle={{
                        ...styles.pauseButton,
                        backgroundColor: "red",
                     }}
                     onPress={togglePlaying}
                     raised
                  />
                  <Button
                     icon={{
                        name: "plus",
                        type: "font-awesome",
                     }}
                     type="outline"
                     containerStyle={styles.sidePauseButtonContainer}
                     buttonStyle={styles.pauseButton}
                     type="clear"
                     onPress={checkItem}
                  />
               </View>
            </View>
         )}
         <View style={styles.control}></View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   summaryContainer: {
      flex: 3,
   },
   summaryBorder: {
      paddingBottom: 20,
      borderBottomWidth: 0.5,
      borderRadius: 20,
   },
   lapseContainer: {
      flex: 6,
      alignContent: "center",
      paddingLeft: "10%",
      paddingRight: "10%",
      paddingTop: 0,
   },
   control: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: 50,
      flexDirection: "row",
   },
   sliderContainer: {
      flex: 1,
   },
   controlButton: {
      width: "100%",
   },
   pauseButtonContainer: {
      flex: 2,
      flexDirection: "row",
      paddingTop: 60,
      justifyContent: "space-between",
   },
   pauseButton: {
      width: 100,
      height: 100,
      borderRadius: 50,
   },
   sidePauseButtonContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: "center",
   },
});

export default AddItem;
