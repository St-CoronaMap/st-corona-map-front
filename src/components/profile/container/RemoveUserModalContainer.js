import React, { useState } from "react";
import RemoveUserModal from "../view/RemoveUserModal";
import { useDispatch } from "react-redux";
import { signout } from "../../../modules/auth";

function RemoveUserModalContainer({ visible, setVisible, navigation, user }) {
   const [success, setSuccess] = useState(false);
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();

   const removeUserFunc = async () => {
      const uid = user.uid;
      setLoading(true);
      try {
         await user.delete();
      } catch (err) {
         console.log(err);
      }
      setSuccess(true);
      dispatch(signout());

      try {
         // 유저 탈퇴
      } catch (err) {
         console.log(err);
      }
      setLoading(false);
   };
   const afterRemove = () => {
      navigation.navigate("Home");
   };
   return (
      <RemoveUserModal
         visible={visible}
         setVisible={setVisible}
         removeUserFunc={removeUserFunc}
         afterRemove={afterRemove}
         success={success}
         loading={loading}
      />
   );
}

export default RemoveUserModalContainer;
