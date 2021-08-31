import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const YOUTUBE_HEIGHT = 9 * (width / 16);
export const WINDOW_HEIGHT = height;
export const HEADERNAME_HEIGHT = 50;
export const CONTROLBAR_HEIGHT = 80;
export const WINDOW_WIDTH = width;
export const TAP_HEIGHT = 48;

export const IS_MOBILE_WEB = width < 600 ? true : false;

export const WEB_COPILOT_BOTTOM =
   height * (IS_MOBILE_WEB ? 0.01 : 0.025) + HEADERNAME_HEIGHT + TAP_HEIGHT;
export const WEB_COPLIOT_RIGHT_OFFSET = IS_MOBILE_WEB ? width * 0.98 : 600;

export const PLAY_SCREEN = "PlayScreen";
export const VIDEOEDIT_PLAY = "videoEdit_play";
export const VIDEOEDIT_SEARCH = "videoEdit_search";
export const SEARCH = "Search";

export const MOBILE_WEB_PALYER_HEIGHT = 9 * ((width * 0.98) / 16);

export const SMALL_MOBILE_WEB = width < 400 ? true : false;
export const PLAYLIST_HEIGHT = IS_MOBILE_WEB ? width * 0.4 : 200;
export const WIDTH = width;
export const HEIGHT = height;

export const modalPadding = 10;
