import React from 'react';
import ReactDOM from 'react-dom';
import functionalComponent from './functionalComponent.jsx';
 
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <functionalComponent />
      </div>
    );
  }
}
 
ReactDOM.render(<App />, document.getElementById('app'));
