import { Platform } from "react-native";

export const fontStyle =
   Platform.OS === "web" ? { fontFamily: "notosans" } : {};

export const boldFontStyle =
   Platform.OS === "web"
      ? {
           fontFamily: "notosans",
           fontWeight: "500",
        }
      : {};

export const inputStyle =
   Platform.OS === "web" ? { ...fontStyle, outlineWidth: 0 } : {};
