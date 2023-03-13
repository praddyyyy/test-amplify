import Slider from '@mui/material/Slider';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';


function valuetext(value) {
  return 100;
}

function Volume(props) {
    return(
        <div className="vol">
          <VolumeUpIcon/>
          <Slider
            className="input"
            type="range"
            min={0}
            max={1}
            step={0.001}
            defaultValue={0.3}
            onChange={props.changevol}
            aria-label="Default"
            getAriaValueText={valuetext} 
            // valueLabelDisplay="auto"
          />
        </div>
    )
}
export default Volume;