import React, { useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import Playbackinfo from "./audio-control/Playback-info";
import Control from "./audio-control/Control";
import Volume from "./audio-control/volume";
import * as ast from "./assist";
import TransitionsModal from "./audio-control/modal";
import Waveform, { aud_arr, colorpairs } from "./visual/Waveform";
import ReplayIcon from "@mui/icons-material/Replay";

let wave = [];
let filter_arr = [];
let panner_arr = [];

function Player() {
  const [cwave, setCwave] = useState(0);

  // function for intialization of wavesurfers
  const initializeWavesurfer = (cont, color, height = 100) => {
    return WaveSurfer.create({
      container: cont,
      // responsive: false,
      waveColor: color,
      progressColor: "gray",
      skiplength: 20,
      fillParent: true,
      minPxPerSec: 10,
      cursorColor: "transparent",
      backgroundColor: "rgba(0,0,0,0.5)",
      hideScrollbar: true,
      interact: false,
      height: height,
    });
  };

  // creating wavesurfers for the audio array
  useEffect(() => {
    for (let i = 0; i < aud_arr.length; i++) {
      wave[i] = initializeWavesurfer("#wave" + i, colorpairs[i]);
      wave[i].load(document.querySelector("#track" + i));
      var EQ = [
        {
          f: 1000,
          type: "highpass",
        },
        {
          f: 8000,
          type: "peaking",
        },
        {
          f: 16000,
          type: "lowpass",
        },
      ];
      // Create filters
      filter_arr[i] = EQ.map(function (band) {
        var filter = wave[i].backend.ac.createBiquadFilter();
        filter.type = band.type;
        filter.gain.value = 0;
        filter.Q.value = 1;
        filter.frequency.value = band.f;
        return filter;
      });

      // Connect filters to wavesurfer
      wave[i].backend.setFilters(filter_arr[i]);
      panner_arr[i] = wave[i].backend.ac.createPanner();
      wave[i].backend.setFilter(panner_arr[i]);
    }

    ast.loadrange(wave[cwave]);

    return () => {
      for (let i = 0; i < aud_arr.length; i++) {
        wave[i].destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // document.onkeydown = checkKey;

  function changewave(e) {
    let control = document.querySelector(".control-flex");
    control.style.display = "flex";
    wave[cwave].stop();
    setCwave(() => e.target.parentElement.id[4]);
    ast.loadrange(wave[e.target.parentElement.id[4]]);
  }

  const handleSkipF = () => {
    ast.sf(wave[cwave]);
  };
  const handlePP = () => {
    ast.playPause(wave[cwave]);
  };
  const handleskipB = () => {
    ast.sb(wave[cwave]);
  };
  const handleRP = () => {
    ast.rp(wave[cwave]);
  };
  const handleCV = () => {
    ast.changevol(wave[cwave]);
  };
  const handleGOTO = () => {
    ast.goto(wave[cwave]);
  };

  const filter = () => {
    ast.filter(filter_arr[cwave]);
  };
  const panner = () => {
    ast.panner(panner_arr[cwave]);
  };

  return (
    <div className="audiopanel" id="audiop">
      <div style={{ position: "relative" }}>
        <Waveform cw={initializeWavesurfer} changewave={changewave} />
        <ReplayIcon
          sx={{
            position: "absolute",
            bottom: "-1rem",
            fontSize: "3rem",
            color: "rgb(143, 9, 16)",
            cursor:"pointer"
          }}
        />
      </div>
      <div className="selections hidden"></div>
      <p>Select a portion to play / edit the audio</p>
      <div className="control-flex" style={{ display: "none" }}>
        <div className="adjust-control">
          <Playbackinfo goto={handleGOTO} />
          <Control
            sf={handleSkipF}
            sb={handleskipB}
            rp={handleRP}
            playPause={handlePP}
          />
          <Volume changevol={handleCV} />
        </div>
        <TransitionsModal
          className="modalcont"
          filter={filter}
          panner={panner}
        />
      </div>
    </div>
  );
}

export default Player;
