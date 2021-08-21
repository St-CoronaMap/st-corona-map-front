import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../view/Profile";
import * as ImagePicker from "expo-image-picker";
import PwUpdateContainer from "./PwUpdateContainer";
import ReauthenticateModalContainer from "./ReauthenticateModalContainer";
import RemoveUserModalContainer from "./RemoveUserModalContainer";
import { setLoading, setUnloading } from "../../../modules/loading";
import { logout, updateProfileAvatar } from "../../../lib/api/auth";
import { signin, signout } from "../../../modules/auth";
import { getPlaylist } from "../../../modules/playlist";
import { afterGetPlaylist } from "../../../lib/utils/afterGetPlaylist";
import { setSnackbar } from "../../../modules/snackbar";
import { RESTART_ERROR, SERVER_ERROR } from "../../../lib/strings";
import { Restart } from "fiction-expo-restart";

function ProfileContainer({ navigation }) {
   const user = useSelector(({ auth }) => auth);
   const [loading, setThisLoading] = useState({ photo: false, name: false });
   const [modalVisible, setModalVisible] = useState(false);
   const [removeUserVisible, setRemoveUserVisible] = useState(false);
   const [reauthenticated, setReauthenticated] = useState(false);
   const [reauthVisible, setReauthVisible] = useState(false);
   const [pw, setPW] = useState("");
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
         if (!result.cancelled) {
            // 프로필 사진 수정
            setThisLoading((prev) => ({ ...prev, photo: true }));
            const res = await updateProfileAvatar(result.uri, user.loginId);
            dispatch(signin(res));
         }
      } catch (err) {
         dispatch(setSnackbar(SERVER_ERROR));
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
      try {
         await logout();
      } catch (err) {
         // 재시작
         dispatch(setSnackbar(RESTART_ERROR));
         dispatch(setUnloading());
         setTimeout(() => Restart(), 2000);
         return;
      }
      dispatch(signout());
      dispatch(getPlaylist(() => afterGetPlaylist(navigation, dispatch)));
   };
   const afterPwChange = () => {
      setReauthenticated(false);
      setPW("");
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
               password={pw}
               setPassword={setPW}
            />
         ) : (
            <>
               <PwUpdateContainer
                  visible={modalVisible}
                  setVisible={setModalVisible}
                  oldPassword={pw}
                  afterPwChange={afterPwChange}
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
