import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlaylist, editPlaylist } from "../../../lib/api/playlist";
import { getPlaylist } from "../../../modules/playlist";
import EditPlaylistModal from "../view/EditPlaylistModal";

function EditPlaylistModalContainer({ visible, cancel, edittingPlaylist }) {
   const [onEditTitle, setOnEditTitle] = useState(false);
   const [name, setName] = useState("");
   const [errMsg, setErrMsg] = useState("");
   const dispatch = useDispatch();
   const uniqueId = useSelector(({ uniqueId }) => uniqueId);

   const onDelete = useCallback(async () => {
      await deletePlaylist(edittingPlaylist.id);
      dispatch(getPlaylist(uniqueId.id));
      cancel();
   }, [edittingPlaylist]);

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
   const callAddPlaylist = useCallback(async (name) => {
      await editPlaylist({
         id: edittingPlaylist.id,
         title: name,
      });
      dispatch(getPlaylist(uniqueId.id));
      setOnEditTitle(false);
      cancel();
   }, []);

   const onEdit = useCallback(() => {
      setOnEditTitle(true);
   }, []);

   const onChange = useCallback(
      (v) => {
         if (errMsg) {
            setErrMsg("");
         }
         setName(v);
      },
      [errMsg]
   );
   return (
      <EditPlaylistModal
         cancel={cancel}
         visible={visible}
         onDelete={onDelete}
         onEdit={onEdit}
         onEditTitle={onEditTitle}
         onChange={onChange}
         addPlaylist={addPlaylistCallback}
         errMsg={errMsg}
      />
   );
}

export default React.memo(EditPlaylistModalContainer);
