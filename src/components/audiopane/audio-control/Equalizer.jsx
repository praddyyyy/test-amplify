function Equalizer(props) {
    return(
        <div className="equalizer">
        <button className="close" onClick={props.close}>&times;</button>
        <input
          type="range"
          className="filter"
          min={-2}
          max={14000}
          step={0.1}
          defaultValue={200}
          onChange={props.filter}
        />
        <input
          type="range"
          className="filter"
          min={-2}
          max={14000}
          step={0.1}
          defaultValue={200}
          onChange={props.filter}
        />
        <input
          type="range"
          className="filter"
          min={0}
          max={14000}
          step={0.1}
          defaultValue={100}
          onChange={props.filter}
        />
        <input
          id="panner-input"
          type="range"
          min="-3"
          max="3"
          step={0.001}
          defaultValue="0"
          onChange={props.panner}
        />
        
      </div>
    )
}

export default Equalizer;