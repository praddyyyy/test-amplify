import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export default function Control(props) {
  return(
  <div className="control">
    <KeyboardDoubleArrowLeftIcon className='icon' id="bd" onClick={props.sb}></KeyboardDoubleArrowLeftIcon>
    <PlayArrowIcon className='play icon' onClick={props.playPause}/>
    <PauseIcon className='pause icon' sx={{display:"none"}} onClick={props.playPause} />
    <KeyboardDoubleArrowRightIcon className='icon' id="fd" onClick={props.sf}></KeyboardDoubleArrowRightIcon>
    <ReplayIcon className='icon' id="replay" onClick={props.rp} />
    
    
  </div>)
}
