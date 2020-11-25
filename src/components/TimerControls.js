import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faUndo } from "@fortawesome/free-solid-svg-icons";

const TimerControls = (props) => {
  return (
    <div id="timer-controls">
      <button className="btn btn-timer" id="start_stop" onClick={props.startStop}>
        {props.running === "RUNNING" ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
      </button>
      <button className="btn btn-timer" id="reset" onClick={props.reset}>
        <FontAwesomeIcon icon={faUndo} />
        <i class="fas fa-undo"></i>
      </button>
    </div>
  );
};

export default TimerControls;
