import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlaylist, editPlaylist } from "../../../lib/api/playlist";
import { setLoading, setUnloading } from "../../../modules/loading";
import { getPlaylist } from "../../../modules/playlist";
import { setSnackbar } from "../../../modules/snackbar";
import EditPlaylistModal from "../view/EditPlaylistModal";

function EditPlaylistModalContainer({ visible, cancel, edittingPlaylist }) {
   const [onEditTitle, setOnEditTitle] = useState(false);
   const [name, setName] = useState("");
   const [errMsg, setErrMsg] = useState("");
   const dispatch = useDispatch();
   const uniqueId = useSelector(({ uniqueId }) => uniqueId);

   const onDelete = useCallback(async () => {
      dispatch(setLoading());
      try {
         await deletePlaylist(edittingPlaylist.id);
         dispatch(getPlaylist(() => dispatch(setUnloading())));
         cancel();
      } catch (err) {
         dispatch(
            setSnackbar(
               "서버 오류로 작업에 실패했습니다. \n다시 시도해 주세요."
            )
         );
         dispatch(setUnloading());
      }
   }, [edittingPlaylist]);

   const editPlaylistCallback = () => {
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
      callEditPlaylist(name);
   };

   const callEditPlaylist = useCallback(
      async (name) => {
         dispatch(setLoading());
         try {
            await editPlaylist({
               id: edittingPlaylist.id,
               title: name,
            });
            dispatch(getPlaylist(() => dispatch(setUnloading())));
            cancelCallback();
         } catch (err) {
            dispatch(
               setSnackbar(
                  "서버 오류로 작업에 실패했습니다. \n다시 시도해 주세요."
               )
            );
            dispatch(setUnloading());
         }
      },
      [edittingPlaylist]
   );

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

   const cancelCallback = useCallback(() => {
      setOnEditTitle(false);
      cancel();
   }, []);

   return (
      <EditPlaylistModal
         cancel={cancelCallback}
         visible={visible}
         onDelete={onDelete}
         onEdit={onEdit}
         onEditTitle={onEditTitle}
         onChange={onChange}
         editPlaylist={editPlaylistCallback}
         errMsg={errMsg}
      />
   );
}

export default React.memo(EditPlaylistModalContainer);
