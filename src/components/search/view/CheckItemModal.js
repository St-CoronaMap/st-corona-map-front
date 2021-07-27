import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { ListItem } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import seperateSecond from "../../../lib/utils/seperateSecond";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";

function CheckItemModal({ visible, close, onOk, item }) {
   const footerButtons = [
      {
         text: "취소",
         onPress: close,
      },
      {
         text: "확인",
         onPress: onOk,
      },
   ];
   const titleProps = { title: "확인" };
   return (
      <CustomModal
         visible={visible}
         title={<CustomModalHeader props={titleProps} />}
         footer={<CustomModalFooter buttons={footerButtons} />}
         rounded={true}>
         <View style={styles.container}>
            <Text style={styles.header}>
               다음을 재생목록에 추가하시겠습니까?{" "}
            </Text>

            <View style={styles.item}>
               <ListItem containerStyle={styles.listItem}>
                  <Image
                     source={{ uri: item.thumbnails }}
                     style={{ width: 100, height: 100 }}
                     transition
                  />
                  <ListItem.Content>
                     <ListItem.Title>
                        {item.title.slice(0, 40)}
                        {item.title.length > 40 ? "..." : ""}
                     </ListItem.Title>
                     <ListItem.Subtitle>
                        {seperateSecond(item.lapse[0])} ~
                        {seperateSecond(item.lapse[1])}
                     </ListItem.Subtitle>
                  </ListItem.Content>
               </ListItem>
            </View>
         </View>
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   container: {
      width: Dimensions.get("window").width - 100,
      backgroundColor: palette.ivory,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 10,
   },
   header: { fontSize: 18 },
   item: {
      width: "100%",
   },
   listItem: {
      backgroundColor: palette.ivory,
      width: "100%",
      overflow: "hidden",
      borderColor: palette.ivory,
      borderWidth: 1,
      borderRadius: 30,
      marginTop: 10,
      padding: 0,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 3,
   },
});

export default React.memo(CheckItemModal);
