import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { ListItem } from "react-native-elements";
import { ModalButton, ModalFooter, ModalTitle } from "react-native-modals";
import seperateSecond from "../../../lib/utils/seperateSecond";
import CustomModal from "../../elements/CustomModal";

function CheckItemModal({ visible, close, onOk, item }) {
   const title = <ModalTitle title="확인" hasTitleBar />;
   const footer = (
      <ModalFooter>
         <ModalButton text="취소" onPress={close} />
         <ModalButton text="확인" onPress={onOk} />
      </ModalFooter>
   );
   return (
      <CustomModal
         visible={visible}
         title={title}
         footer={footer}
         rounded={true}>
         <View style={styles.container}>
            <Text style={styles.header}>
               다음을 재생목록에 추가하시겠습니까?{" "}
            </Text>

            <View style={styles.item}>
               <ListItem>
                  <Image
                     source={{ uri: item.thumbnails }}
                     style={{ width: 100, height: 100 }}
                     transition
                  />
                  <ListItem.Content>
                     <ListItem.Title>{item.title}</ListItem.Title>
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
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 10,
   },
   header: { fontSize: 18 },
   item: {
      width: "100%",
   },
});

export default CheckItemModal;
