export default function seperateSecond(second) {
   let hour = `${Math.floor(second / 3600)}`;
   hour = hour.length === 1 ? "0" + hour : hour;
   second %= 3600;

   let minute = `${Math.floor(second / 60)}`;
   minute = minute.length === 1 ? "0" + minute : minute;
   second %= 60;

   return `${hour}:${minute}:${second < 10 ? "0" + `${second}` : second}`;
}
