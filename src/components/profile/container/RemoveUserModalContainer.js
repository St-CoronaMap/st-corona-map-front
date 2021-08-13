import React, { useState } from "react";
import RemoveUserModal from "../view/RemoveUserModal";
import { useDispatch } from "react-redux";
import { setLoading, setUnloading } from "../../../modules/loading";
import { removeUser } from "../../../lib/api/auth";

function RemoveUserModalContainer({ visible, setVisible, navigation }) {
   const [success, setSuccess] = useState(false);
   const dispatch = useDispatch();

   const removeUserFunc = async () => {
      dispatch(setLoading());
      try {
         await removeUser();
         // 뭔가 회원 정보 다 날리는 작업
         setSuccess(true);
      } catch (err) {
         console.log(err);
      }
      dispatch(setUnloading());
   };
   const afterRemove = () => {
      navigation.navigate("Playlist");
   };
   return (
      <RemoveUserModal
         visible={visible}
         setVisible={setVisible}
         removeUserFunc={removeUserFunc}
         afterRemove={afterRemove}
         success={success}
      />
   );
}

export default RemoveUserModalContainer;
