

export default function Playbackinfo(props) {
    return(
  <div className="playback-info">
    <span id="current">0:00</span>
    <input
      className="input"
      type="range"
      min={0}
      max={100}
      step={0.01}
      defaultValue={0}
      onChange={props.goto}
    />
    <span id="duration">0:00</span>
  </div>)
}

