const Display = (props) => {
  return (
    <div id="timer-display">
      <div id="timer-label">{props.timerName}</div>
      <div id="time-left">
        {props.minutes}:{props.seconds}
      </div>
    </div>
  );
};

export default Display;
