import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlaylist } from "../../../lib/api/playlist";
import { setLoading, setUnloading } from "../../../modules/loading";
import { getPlaylist } from "../../../modules/playlist";
import { setSnackbar } from "../../../modules/snackbar";
import AddPlaylistModal from "../view/AddPlaylistModal";

function AddPlaylistModalContainer({ visible, cancel }) {
   const [name, setName] = useState("");
   const [errMsg, setErrMsg] = useState("");
   const dispatch = useDispatch();
   const onChange = (v) => {
      if (errMsg) {
         setErrMsg("");
      }
      setName(v);
   };
   const addPlaylistCallback = () => {
      if (!name) {
         setErrMsg("이름을 입력해주세요");
         return;
      }
      if (name[0] === " " || name[name.length - 1] === " ") {
         setErrMsg("처음과 마지막은 띄어쓰기가 될 수 없습니다.");
         return;
      }
      if (name.length > 20) {
         setErrMsg("최대 20자까지 가능합니다.");
         return;
      }
      callAddPlaylist(name);
   };

   const callAddPlaylist = async (name) => {
      dispatch(setLoading());
      try {
         await addPlaylist({
            title: name,
            isPublic: false,
            category: "OTHER",
         });
         dispatch(getPlaylist(() => dispatch(setUnloading())));
         cancel();
      } catch (err) {
         if (err.message === "비회원 playlist 제한을 초과하였습니다.") {
            dispatch(
               setSnackbar(
                  "비회원은 재생목록을 최대 10개까지 만들 수 있습니다."
               )
            );
         } else {
            dispatch(
               setSnackbar(
                  "서버 오류로 작업에 실패했습니다. \n다시 시도해 주세요."
               )
            );
         }
         dispatch(setUnloading());
      }
   };

   return (
      <AddPlaylistModal
         visible={visible}
         cancel={cancel}
         addPlaylist={addPlaylistCallback}
         errMsg={errMsg}
         name={name}
         onChange={onChange}
      />
   );
}

export default React.memo(AddPlaylistModalContainer);
