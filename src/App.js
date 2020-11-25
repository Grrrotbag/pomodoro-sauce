import React from "react";
import "./App.css";
import SettingControls from "./components/SettingControls";
import Display from "./components/Display";
import TimerControls from "./components/TimerControls";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerName: "Session",
      running: "OFF",
      breakLength: 5,
      sessionLength: 25,
      timer: 25 * 60,
      minutes: 25,
      seconds: "00",
    };
  }

  incrementSession() {
    const { sessionLength, minutes } = this.state;
    if (sessionLength < 60) {
      this.setState({
        sessionLength: sessionLength + 1,
        minutes: minutes + 1,
      });
    }
  }

  decrementSession() {
    const { sessionLength, minutes } = this.state;
    if (sessionLength > 1) {
      this.setState({
        sessionLength: sessionLength - 1,
        minutes: minutes - 1,
      });
    } else {
      this.setState({
        sessionLength: 1,
      });
    }
  }

  incrementBreak() {
    const { breakLength } = this.state;
    if (breakLength < 60) {
      this.setState({
        breakLength: breakLength + 1,
      });
    }
  }

  decrementBreak() {
    const { breakLength } = this.state;
    if (breakLength > 1) {
      this.setState({
        breakLength: breakLength - 1,
      });
    } else {
      this.setState({
        breakLength: 1,
      });
    }
  }

  reset() {
    this.stopAlarm();
    clearInterval(this.interval);
    this.setState({
      timerName: "Session",
      running: "OFF",
      breakLength: 5,
      sessionLength: 25,
      timer: 25 * 60,
      minutes: 25,
      seconds: "00",
    });
  }

  // Thanks to https://codepen.io/mgazge/pen/zLMrNo?editors=0010 for the idea here.
  // Also thanks to this tutorial for helping me understand setInterval https://www.youtube.com/watch?v=NAx76xx40jM
  countdown() {
    const { running, timerName, breakLength, sessionLength } = this.state;
    if (running === "RUNNING") {
      const count = this.state.timer - 1;
      if (count >= 0) {
        const mins = Math.floor(count / 60);
        const secs = count - mins * 60;

        this.setState({
          timer: count,
          minutes: mins < 10 ? "0" + mins : mins,
          seconds: secs < 10 ? "0" + secs : secs,
        });

        if (count === 0) {
          this.playAlarm();
        }
      } else {
        let newtimerName, newTimerLength, newTimer, newSeconds;
        if (timerName === "Session") {
          newtimerName = "Break";
          newTimerLength = breakLength;
        } else {
          newtimerName = "Session";
          newTimerLength = sessionLength;
        }
        newTimer = newTimerLength * 60;
        newSeconds = 0;

        this.setState({
          timerName: newtimerName,
          timer: newTimer,
          minutes: newTimerLength < 10 ? "0" + newTimerLength : newTimerLength,
          seconds: newSeconds < 10 ? "0" + newSeconds : newSeconds,
        });
      }
    }
  }

  handleStartStop() {
    const { running, minutes } = this.state;
    switch (running) {
      case "OFF":
        this.setState({
          running: "RUNNING",
          timer: minutes * 60,
        });
        this.interval = setInterval(() => this.countdown(), 1000);
        break;
      case "RUNNING":
        this.setState({ running: "PAUSED" });
        clearInterval(this.interval);
        break;
      case "PAUSED":
        this.setState({ running: "RUNNING" });
        this.interval = setInterval(() => this.countdown(), 1000);
        break;
      default:
        break;
    }
  }

  playAlarm = () => {
    document.getElementById("beep").play();
  };

  stopAlarm = () => {
    let alarm = document.getElementById("beep");
    alarm.pause();
    alarm.currentTime = 0;
  };

  render() {
    return (
      <div id="main-container">
        <div id="header">
          <h1>Pomodoro Sauce!</h1>
        </div>
        <div id="timer-container">
          <SettingControls
            incrementSession={this.incrementSession.bind(this)}
            decrementSession={this.decrementSession.bind(this)}
            incrementBreak={this.incrementBreak.bind(this)}
            decrementBreak={this.decrementBreak.bind(this)}
            breakLength={this.state.breakLength}
            sessionLength={this.state.sessionLength}
          />
          <Display
            timer={this.state.timer}
            minutes={this.state.minutes}
            seconds={this.state.seconds}
            timerName={this.state.timerName}
          />
          <TimerControls
            reset={this.reset.bind(this)}
            startStop={this.handleStartStop.bind(this)}
            running={this.state.running}
          />
          <audio id="beep">
            <source src="http://soundbible.com/grab.php?id=1599&type=mp3" type="audio/mp3" />
          </audio>
        </div>
      </div>
    );
  }
}

export default App;
