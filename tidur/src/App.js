import React from "react";
import './App.css';
import logo from './Dif.jpg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0, 
      elapsedTime: 0,
      timerId: null,
      isRunning: false,
      timeToAdd: 0
    };
  }
  TidurText = () => {
    var m = Math.floor(this.state.elapsedTime / 60000);
    var s = Math.floor((this.state.elapsedTime % 60000) / 1000);
    var cs = Math.floor((this.state.elapsedTime % 1000) / 10, 100 );
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    cs = (cs < 10) ? "0" + cs : cs;
    this.setState({
      elapsedTime: m + ":" + s + ":" + cs
    });
  };

  Tid = () => {
    this.setState({
      timerId: setTimeout(() => {
        this.setState({
          elapsedTime: Date.now() - this.state.startTime + this.state.timeToAdd
        });
        this.TidurText();
        this.Tid();
      }, 10)
    });
  };

  Starta = () => {
    this.setState({
      isRunning: true
    });
    this.setState({
      startTime: Date.now()
    });
    this.Tid();
  };
  Stopp = () => {   
    this.setState({
      isRunning: false
    });
    this.setState({
        timeToAdd: this.state.timeToAdd + (Date.now() - this.state.startTime)
    });
    clearTimeout(this.state.timerId);
  };
  Nollstall = () => {
     this.setState({
        elapsedTime: 0,
        timeToAdd: 0,        
    });
  }
  
  render() {
    return (
      <div className="App-total">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 ref="header">Tidtagarur</h2>
        {this.state.elapsedTime === 0 && (
        < div className="This-tid">00:00:00</div>
        )}
        {this.state.elapsedTime === 0 || (
        < div className="This-tid">{this.state.elapsedTime}</div>
        )}
        {this.state.isRunning === false && this.state.timeToAdd <= 0 &&(
        <button onClick={this.Starta} className="This-app">Starta</button>
        )}
         {this.state.isRunning === false && this.state.timeToAdd > 0 && (
        <button onClick={this.Starta} className="This-app">Fortsätt</button>
        )}
        {this.state.isRunning === true && (
        <button onClick={this.Stopp} className="This-app">Stopp</button>
        )}
        {this.state.timeToAdd > 0 && this.state.isRunning === false && (
        <button onClick={this.Nollstall} className="This-app">Nollställ</button>
        )}
      </div>
    );
  }
}
export default App;