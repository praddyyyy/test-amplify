// const { getAudioDurationInSeconds } = require('get-audio-duration');

function checkKey(e,param) {
  e = e || window.event;
  if (e.keyCode === 37 || e.keyCode === 121) {
    sb(param);
  } else if (e.keyCode === 39) {
    sf(param);
  } else if (e.keyCode === 32) {
    e.preventDefault();
    playPause(param);
  } else if (e.keyCode === 38) {
    changevol(param)
  } else if (e.keyCode === 40) {
    changevol(param)
  }
}

function playPause(param) {
  const play = document.querySelector(".play");
  const pause = document.querySelector(".pause");

  param.on("play", function () {
    play.style.display = 'none';
    pause.style.display = 'inline-block';

  });

  param.on("pause", function () {
    pause.style.display = 'none';
    play.style.display = 'inline-block';
    
  });
  param.playPause();
}
function sb(param) {
  param.skipBackward();
}
function sf(param) {
  param.skipForward();
}

function changevol(param) {
  const volsliderval = document.querySelector(".vol input");
  param.setVolume(volsliderval.value);
}

function rp(param) {
  param.stop();
  param.playPause();
}

var percent = function (value1, value2) {
  return (value1 / value2) * 100;
};

var timeCalculator = function (value) {
    let second = Math.floor(value % 60);
    let minute = Math.floor((value / 60) % 60);

    if (second < 10) {
      second = "0" + second;
    }
    return minute + ":" + second;
  };

function goto(param) {
  const ipr = document.querySelector(".playback-info input");
  let skippercent =
    ipr.value - percent(param.getCurrentTime(), param.getDuration());
  let goto = (skippercent * param.getDuration()) / 100;
  param.skip(goto);
}

function loadrange(param) {
    
    const current = document.querySelector("#current");
    const duration = document.querySelector("#duration");
    const ipr = document.querySelector(".playback-info .input");

  param.on("audioprocess", function () {
    current.textContent = timeCalculator(param.getCurrentTime());
    ipr.value = percent(param.getCurrentTime(), param.getDuration());
  });

  param.on("seek", function () {
    current.textContent = timeCalculator(param.getCurrentTime());
    ipr.value = percent(param.getCurrentTime(), param.getDuration());
  });

  param.on("interaction", function () {
    duration.textContent = timeCalculator(param.getDuration());
  });
  param.on("ready", function () {
    duration.textContent = timeCalculator(param.getDuration());
  });
  playPause(param);
  changevol(param);
}

function filter(filter) {
  let filterip = document.querySelectorAll(".filter")
  for(let i = 0; i<filterip.length; i++){
    console.log(filter[i].frequency.value);
    filter[i].frequency.value = filterip[i].value;
    console.log(filter[i].frequency.value);
  }
  console.log("filters applied");

}

var panner = function (panner) {
  let panip = document.querySelector("#panner-input")
  var xDeg = parseInt(panip.value);
  var x = Math.sin(xDeg * (Math.PI / 180));
  panner.setPosition(x, 0, 0);
};

function getDuration(param) {
  let audio = document.createElement('audio')
  let src = document.createElement('source')
  audio.appendChild(src)
  audio.setAttribute('preload','metadata')
  src.setAttribute('src',param)
  
  audio.onloadedmetadata = function() {
    console.log(audio.duration);
    return timeCalculator(audio.duration)
};
  // return duration;
  // getAudioDurationInSeconds(param).then((duration) => {
  //   return timeCalculator(duration);
  // })
}

export { playPause, sb, sf, rp, changevol, goto, loadrange, getDuration , filter, panner};
