import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    bool: true,
    username: "",
    password: "",
  }

  inputUpdate = evt => {
    const state = { ...this.state }
    state[evt.target.id] = evt.target.value
    this.setState(state)
  }

  signIn = () => {
    console.log("Signing in")
  }

  signUp = () => {
    console.log("Signing up")
  }

  render() {
    return(
      <React.Fragment>
        <h1>This is the app</h1>
        <form>
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="username" value={this.state.username} onChange={this.inputUpdate}></input>
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="username" value={this.state.password} onChange={this.inputUpdate}></input>
        </form>
        <button onClick={this.signIn}>Sign In</button>
        <button onClick={this.signUp}>Sign Up</button>
      </React.Fragment>
    )
  }
}

export default App;
