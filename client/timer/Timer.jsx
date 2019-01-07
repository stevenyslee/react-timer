import React from 'react';
import Minutes from './components/Minutes.jsx';
import Seconds from './components/Seconds.jsx';
 
class Timer extends React.Component {
  constructor(props) {
    super(props);
    let { minutes = '2', seconds = '00' } = this.props;
    this.state = {
      minutes,
      seconds,
      interval: null      
    };
    this.countDown = this.countDown.bind(this);
  }

  countDown() {
    let { minutes, seconds } = this.state;
    if (minutes === '0' && seconds === '00') {
      this.setState((prevState) => {
        return { interval: clearInterval(this.state.interval) };
      });
    } else {
      let newSeconds;
      let newMinutes = minutes;

      if (Number(seconds) > 0) {
        newSeconds = (seconds - 1).toString();
        if (Number(newSeconds) < 10) {
          newSeconds = '0' + newSeconds;
        }
      } else {
        newSeconds = '59';
      }

      if (newSeconds == '59' && Number(minutes) > 0) {
        newMinutes = (minutes - 1).toString();
      }

      this.setState((prevState) => {
        return {
          minutes: newMinutes,
          seconds: newSeconds
        }
      });
    }
  }

  componentDidMount() {
    this.setState((prevState) => {
      return {
        interval: setInterval(() => {
          this.countDown();
        }, 1000)
      }
    });
  }
  
  render() {
    return (
      <div>
        <span style={{ display: 'flex' }}>
          <Minutes minutes={this.state.minutes} />
          <span>:</span>
          <Seconds seconds={this.state.seconds} />
        </span>
      </div>
    );
  }
}

export default Timer;
