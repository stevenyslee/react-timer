import React from 'react';
import ReactDOM from 'react-dom';
import FunctionalComponent from './functionalComponent.jsx';
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <FunctionalComponent />
      </div>
    );
  }
}
 
ReactDOM.render(<App />, document.getElementById('app'));
