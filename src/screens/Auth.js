import React from "react";
import { useSelector } from "react-redux";
import LoginContainer from "../components/auth/container/LoginContainer";
import ProfileContainer from "../components/profile/container/ProfileContainer";

function Auth({ navigation }) {
   const { signined } = useSelector(({ auth }) => auth);
   return signined ? (
      <ProfileContainer />
   ) : (
      <LoginContainer navigation={navigation} />
   );
}

export default Auth;
