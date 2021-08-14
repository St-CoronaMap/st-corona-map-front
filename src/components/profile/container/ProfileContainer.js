import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../view/Profile";
import * as ImagePicker from "expo-image-picker";
import PwUpdateContainer from "./PwUpdateContainer";
import ReauthenticateModalContainer from "./ReauthenticateModalContainer";
import RemoveUserModalContainer from "./RemoveUserModalContainer";
import { setLoading, setUnloading } from "../../../modules/loading";
import { logout } from "../../../lib/api/auth";
import { signout } from "../../../modules/auth";
import { getPlaylist } from "../../../modules/playlist";
import { afterGetPlaylist } from "../../../lib/utils/afterGetPlaylist";

function ProfileContainer({ navigation }) {
   const { user } = useSelector(({ auth }) => auth);
   const [loading, setThisLoading] = useState({ photo: false, name: false });
   const [onEdit, setOnEdit] = useState({});
   const [editUserInfo, setEditUserInfo] = useState({});
   const [modalVisible, setModalVisible] = useState(false);
   const [removeUserVisible, setRemoveUserVisible] = useState(false);
   const [reauthenticated, setReauthenticated] = useState(false);
   const [reauthVisible, setReauthVisible] = useState(false);
   const [errMsg, setErrMsg] = useState({ name: "" });

   const dispatch = useDispatch();

   const changeAvatar = async () => {
      try {
         let res = await ImagePicker.getMediaLibraryPermissionsAsync();
         if (!res.granted) {
            res = await ImagePicker.requestMediaLibraryPermissionsAsync(false);
            if (!res.grated) {
               return;
            }
         }
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
         });
         setThisLoading((prev) => ({ ...prev, photo: true }));
         if (!result.cancelled) {
            // 프로필 사진 수정
         }
      } catch (err) {
         console.log(err);
      }
      setThisLoading((prev) => ({ ...prev, photo: false }));
   };

   const changeDisplayName = async () => {
      setThisLoading((prev) => ({ ...prev, name: true }));
      if (user.displayName !== editUserInfo.name) {
         try {
            // 닉네임 수정
            setOnEdit({});
         } catch (err) {
            setErrMsg((prev) => ({
               ...prev,
               name: "변경 중에 오류가 발생했습니다. 다시 시도해주세요.",
            }));
         }
      } else {
         setOnEdit({});
      }
      setThisLoading((prev) => ({ ...prev, name: false }));
   };

   const onPressOnEdit = (name, value) => {
      if (Object.keys(onEdit).length === 0) {
         setOnEdit({ [name]: true });
         setEditUserInfo({ [name]: value });
      }
   };
   const onChange = (name, value) => {
      if (!errMsg[name]) {
         setErrMsg((prev) => ({ ...prev, [name]: "" }));
      }
      setEditUserInfo((prev) => ({ ...prev, [name]: value }));
   };
   const showChangePassword = async () => {
      setModalVisible(true);
      setReauthVisible(true);
   };
   const showRemoveUser = async () => {
      setRemoveUserVisible(true);
      setReauthVisible(true);
   };
   const onPressLogout = async () => {
      dispatch(setLoading());
      await logout();
      dispatch(signout());
      dispatch(getPlaylist(() => afterGetPlaylist(navigation, dispatch)));
   };
   return (
      <>
         <Profile
            user={user}
            changeAvatar={changeAvatar}
            loading={loading}
            changeDisplayName={changeDisplayName}
            onPressOnEdit={onPressOnEdit}
            onEdit={onEdit}
            onChange={onChange}
            editUserInfo={editUserInfo}
            showChangePassword={showChangePassword}
            showRemoveUser={showRemoveUser}
            errMsg={errMsg}
            onPressLogout={onPressLogout}
         />
         {(modalVisible || removeUserVisible) && !reauthenticated ? (
            <ReauthenticateModalContainer
               reauthVisible={reauthVisible}
               setReauthVisible={setReauthVisible}
               setReauthenticated={setReauthenticated}
            />
         ) : (
            <>
               <PwUpdateContainer
                  visible={modalVisible}
                  setVisible={setModalVisible}
               />
               <RemoveUserModalContainer
                  visible={removeUserVisible}
                  setVisible={setRemoveUserVisible}
                  navigation={navigation}
               />
            </>
         )}
      </>
   );
}

export default ProfileContainer;
