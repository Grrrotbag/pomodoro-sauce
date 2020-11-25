import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const SettingControls = (props) => {
  return (
    <div id="timer-controls">
      <div id="session-box">
        <div id="session-label">Session Length</div>
        <button className="btn btn-control" id="session-decrement" onClick={props.decrementSession}>
          <FontAwesomeIcon icon={faMinus} />
          <i class="fas fa-minus"></i>
        </button>
        <span id="session-length">{props.sessionLength}</span>
        <button className="btn btn-control" id="session-increment" onClick={props.incrementSession}>
          <FontAwesomeIcon icon={faPlus} />
          <i class="fas fa-plus"></i>
        </button>
      </div>

      <div id="break-box">
        <div id="break-label">Break Length</div>
        <button className="btn btn-control" id="break-decrement" onClick={props.decrementBreak}>
          <FontAwesomeIcon icon={faMinus} />
          <i class="fas fa-minus"></i>
        </button>
        <span id="break-length">{props.breakLength}</span>
        <button className="btn btn-control" id="break-increment" onClick={props.incrementBreak}>
          <FontAwesomeIcon icon={faPlus} />
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default SettingControls;
