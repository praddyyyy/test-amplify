
import s1 from "./../../assets/audio/5.mp3";
import s2 from "./../../assets/audio/2.mp3";
import s3 from "./../../assets/audio/3.mp3";
import s4 from "./../../assets/audio/4.mp3";
import s5 from "./../../assets/audio/6.mp3";

import { getDuration } from "./assist";

function audio() {
  
  let aud_arr = [
    {audio : s1, key:1, name: "smrhbf", duration:getDuration(s1)},
    {audio : s2, key:2, name: "sdlksnlv", duration:getDuration(s2)},
    {audio : s3,key:3, name: "sackhdsb  sjcgvgsavc  sjvgvcu", duration:getDuration(s3)},
    {audio : s4, key:4, name: "adkjkdb", duration:getDuration(s4)},
    {audio : s5, key:5, name: "dsvj sdv ", duration:getDuration(s5)}
];
  return aud_arr;
}

export default audio;
