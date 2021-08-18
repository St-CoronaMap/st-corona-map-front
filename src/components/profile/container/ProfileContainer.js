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
   const [modalVisible, setModalVisible] = useState(false);
   const [removeUserVisible, setRemoveUserVisible] = useState(false);
   const [reauthenticated, setReauthenticated] = useState(false);
   const [reauthVisible, setReauthVisible] = useState(false);
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
            showChangePassword={showChangePassword}
            showRemoveUser={showRemoveUser}
            onPressLogout={onPressLogout}
         />
         {(modalVisible || removeUserVisible) && !reauthenticated ? (
            <ReauthenticateModalContainer
               user={user}
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
                  onPressLogout={onPressLogout}
               />
            </>
         )}
      </>
   );
}

export default ProfileContainer;
