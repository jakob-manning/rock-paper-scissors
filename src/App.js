import React from 'react'
import './App.css';
import RPS from "./RPS/RPS";

class App extends React.Component {

  componentDidMount() {
    console.log('component mounted')
  }

  testMethod() {
      let x = document.createElement('StopWatch')
  }

  render(){
    return (
        <div className="App">
            <RPS></RPS>
        </div>
    )
  }
}

export default App;
