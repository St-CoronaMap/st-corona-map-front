const copilot = {
   "en-US": {
      playlist_step_1: "Add your video by Search and complete your list!",
      videoEdit_web_step_1:
         "Adjust a range by slider and button,\nthen press apply to check it.",
      videoEdit_web_step_2:
         "If you like it, press this button for adding to playlist!",
      videoEdit_step_1: "Adjust a range by slider and button",
      videoEdit_step_2: "After adjust, press this button to check.",

      close: "close",
      prev: "prev",
      next: "next",
   },
   "ko-KR": {
      playlist_step_1:
         "상단의 검색을 통해 영상을 추가하고, 재생목록을 완성시키세요!",
      videoEdit_web_step_1:
         "슬라이더와 버튼을 통해 원하시는 범위를 조절하시고, \n적용버튼을 눌러서 확인하세요.",
      videoEdit_web_step_2:
         "마음에 드신다면, 이 버튼을 눌러 재생목록에 추가하세요!",
      videoEdit_step_1: "슬라이더와 버튼을 통해 원하시는 범위를 조절하세요.",
      videoEdit_step_2: "조절을 하신 후, 이 버튼을 누르셔서 확인하세요.",

      close: "닫기",
      prev: "이전",
      next: "다음",
   },
};

const auth = {
   "en-US": {
      signin: "Sign in",
      signup: "Sign up",
      remove: "Withdrawal",
      id: "id",
      password: "password",
      passwordCheck: "password check",
      signup_info:
         "* Playlists which you have will be synchronized automatically.",
      password_format:
         "Password should be 8 to 20 characters long and contain numbers and special charater",
      change_password: "New pw",
      signout: "Sign out",
      createdAt: "Joined at",
      change_password_success: "Password Change Successful.",
      input_new_password: "Input your new password.",
      input_current_password: "Input current password.",
      reauth: "Reauth",
      thankyou_for_using: "Thank you for using our services",
      remove_info:
         "Your every information will be deleted. \nWould you wanna really withdrawal?",

      uncatched_error: "Uncatched error occur, Please retry.",
      same_password: "It's same with original password.",
      email_not_formatted: "Email is not formatted.",
      password_not_match: "Password is not match with password check",
      id_already_used: "Id is already in use.",
      user_not_exist: "User is not exist.",
      wrong_password: "It's wrong password.",
      blank_password: "Please input password.",
      blank_id: "Please input Id.",
   },

   "ko-KR": {
      signin: "로그인",
      signup: "회원가입",
      remove: "회원탈퇴",
      id: "아이디",
      password: "비밀번호",
      passwordCheck: "비밀번호 확인",
      signup_info: "* 가입 시, 기존 재생목록은 자동으로 동기화 됩니다.",
      password_format:
         "비밀번호는 알파벳, 숫자, 특수문자 조합으로 8~20자여야 합니다.",
      change_password: "비밀번호 변경",
      signout: "로그아웃",
      createdAt: "가입일",
      change_password_success: "비밀번호 변경에 성공하셨습니다.",

      input_new_password: "새로운 비밀번호를 입력해주세요.",
      input_current_password: "현재 비밀번호를 입력해주세요.",
      reauth: "재로그인",
      thankyou_for_using: "이용해주셔서 감사합니다.",
      remove_info: "회원님의 모든 정보가 삭제됩니다.\n정말로 탈퇴하시겠습니까?",

      uncatched_error: "알수없는 오류가 발생했습니다. 다시 시도해주세요.",
      same_password: "기존 비밀번호와 같은 비밀번호입니다.",
      email_not_formatted: "이메일 형식을 지켜주세요.",
      password_not_match: "비밀번호가 일치하지 않습니다.",
      id_already_used: "이미 사용중인 아이디입니다.",
      user_not_exist: "존재하지 않는 회원입니다.",
      wrong_password: "비밀번호가 틀렸습니다.",
      blank_password: "비밀번호를 입력해주세요.",
      blank_id: "아이디를 입력해주세요.",
   },
};

export const i18nTranslation = {
   "en-US": {
      playlist: "playlist",
      search: "search",
      signIn: "sign in",
      profile: "profile",

      server_error: "Failed because of server error.\nPlease retry.",
      restart_error: "Uncatched error detected.\nApp will restart soon.",

      blank_playlist: "Playlist is blank.",
      blank_playlist_name: "Please input Playlist's name.",
      playlist_name_format: "First and Last should not be blank.",
      playlist_name_length: "Maximum name length is 20.",
      enter_playlist_name: "Please input playlist's name.",
      enter_new_playlist_name: "Please input new playlist's name.",
      add_playlist_modal_title: "Add Playlist",
      change_playlist_name: "Change name",
      delete_playlist: "Delete",

      nonmember_playlist_limit: "Nonmember could have only five playlists.",
      update_range: "Would you update like below?",
      add_video: "Would you wanna add below?",
      select_playlist: "Select playlist",

      cancel: "Cancel",
      add: "Add",
      edit: "Edit",
      search: "Search",
      apply: "Apply",
      yes: "Yes",
      no: "No",
      change: "Change",
      ok: "Ok",

      ...copilot["en-US"],
      ...auth["en-US"],
   },
   "ko-KR": {
      playlist: "재생목록",
      search: "검색",
      signIn: "로그인",
      profile: "프로필",
      server_error: "서버 오류로 작업에 실패했습니다. \n다시 시도해 주세요.",
      restart_error: "앱에 이상이 생겨 재실행 하겠습니다.",

      blank_playlist: "재생목록이 비어있습니다.",
      blank_playlist_name: "이름을 입력해주세요.",
      playlist_name_format: "처음과 마지막은 띄어쓰기가 될 수 없습니다.",
      playlist_name_length: "최대 20자까지 가능합니다.",
      enter_playlist_name: "추가하실 재생목록의 이름을 입력해주세요.",
      enter_new_playlist_name: "새로운 재생목록의 이름을 입력해주세요.",
      add_playlist_modal_title: "재생목록 추가",
      change_playlist_name: "이름변경",
      delete_playlist: "삭제",

      nonmember_playlist_limit:
         "비회원은 재생목록을 최대 5개까지 만들 수 있습니다.",
      update_range: "다음과 같이 수정하시겠습니까?",
      add_video: "해당 영상을 재생목록에 추가하시겠습니까?",
      select_playlist: "재생목록 선택",

      cancel: "취소",
      add: "추가",
      edit: "수정",
      search: "검색",
      apply: "적용",
      yes: "예",
      no: "아니요",
      change: "변경",
      ok: "확인",

      ...copilot["ko-KR"],
      ...auth["ko-KR"],
   },
};
