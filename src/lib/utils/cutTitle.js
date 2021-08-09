export const cutTitle = (s) => {
   if (s.length < 60) return s;

   return `${s.slice(0, 60)}...`;
};
