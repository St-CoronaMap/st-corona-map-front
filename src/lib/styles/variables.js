import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const YOUTUBE_HEIGHT = 9 * (width / 16);
export const WINDOW_HEIGHT = height;
export const HEADERNAME_HEIGHT = 50;
export const CONTROLBAR_HEIGHT = 80;
export const WINDOW_WIDTH = width;
export const TAP_HEIGHT = 48;

export const WEB_COPILOT_BOTTOM =
   height * 0.025 + HEADERNAME_HEIGHT + TAP_HEIGHT;

export const PLAY_SCREEN = "PlayScreen";
export const VIDEOEDIT_PLAY = "videoEdit_play";
export const VIDEOEDIT_SEARCH = "videoEdit_search";
export const SEARCH = "Search";

export const IS_MOBILE_WEB = width < 600 ? true : false;
export const MOBILE_WEB_PALYER_HEIGHT = 9 * ((width * 0.98) / 16);
