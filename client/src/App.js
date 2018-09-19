import './App.css'
import React, { Component } from 'react'
import Routes from './routes/Routes'
import NavBar from './components/UI/NavBar'
import { MainWrapper } from './styles/sharedStyles'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <MainWrapper>
          <Routes />
        </MainWrapper>
      </div>
    )
  }
}

export default App
