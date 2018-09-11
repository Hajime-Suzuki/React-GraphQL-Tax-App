import './App.css'
import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    )
  }
}

export default App
