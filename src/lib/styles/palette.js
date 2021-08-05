import { Platform } from "react-native";

const palette = {
   lightPink: "#ffc2c3",
   coral: "#fe7773",
   redRose: "#e81e25",
   softBlackBerry: "gray",
   blackBerry: "#0e0301",
   deepRedRose: "#e01020",
   ivory: Platform.OS === "web" ? "#fafafa" : "#f5f5f5",
   deepCoolGray: "#acabaf",
   modalRed: "#d92139",
   softGray: "#E4E3E3",
};

export default palette;
