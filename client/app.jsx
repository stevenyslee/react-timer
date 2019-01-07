import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './timer/Timer.jsx'

 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  
  render() {
    return (
      <div>
        <Timer minutes={'1'} seconds={'03'} />
        <Timer />
      </div>
    );
  }
}
 
ReactDOM.render(<App />, document.getElementById('app'));
