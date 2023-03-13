import React from "react";
import audio from "../audioloader";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

let aud_arr = audio();
let colorpairs = [
  ["red", "green"],
  ["white", "yellow"],
  ["grey", "black"],
  ["white", "blue"],
  ["green", "white"],
];

let selectedaud = [];

const Tt = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export default function Waveform(props) {
  function dc(event) {
    const sel = document.querySelector(".selections")
    sel.classList.remove('hidden')
    let div= document.createElement('div')
    sel.appendChild(div)
    let aud = document.createElement('audio')
    let play = aud_arr[event.target.parentElement.id[4]].audio;
    aud.setAttribute('src',play)
    div.appendChild(aud)
    let nw = props.cw(div,colorpairs[event.target.parentElement.id[4]],80)
    nw.load(aud)
    selectedaud.push(play);

  }
  const audcomp = aud_arr.map((aud, key) => (
    <Tt
      title={
        <React.Fragment>
          <em>name of the track : {aud.name}</em> <br />
          <em>Duration : { aud.duration}</em>
        </React.Fragment>
      }
      arrow
      key={aud.key}
    >
      <div id={"wave" + key} className="wave" onClick={props.changewave} onDoubleClick={dc}>
        <audio id={"track" + key} src={aud.audio} />
      </div>
    </Tt>
  ));
    
  return (
    <div>
      <Accordion className="acc" sx={{color : "Black",backgroundColor:"rgb(0,0,0,0.2)"}} defaultExpanded={true}>
        <AccordionDetails>
          <div className="visual">{audcomp}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export { aud_arr, colorpairs, selectedaud };
