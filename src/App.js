import React from 'react';
import './App.css';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

class App extends React.Component {
  state = {
    bool: true,
    username: "",
    password: "",
    verificationCode: ""
  }

  inputUpdate = evt => {
    const state = { ...this.state }
    state[evt.target.id] = evt.target.value
    this.setState(state)
  }

  signIn = () => {
    console.log("Signing in")
    var authenticationData = {
        Username : this.state.username,
        Password : this.state.password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId : 'us-east-2_POvycrMmM', // Your user pool id here
        ClientId : '23tcni1j6dbefiibk3ra69f0d2' // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : this.state.username,
        Pool : userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            debugger
            var accessToken = result.getAccessToken().getJwtToken();
            debugger
        },

        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },

    });
  }

  signUp = () => {
    console.log("Signing up")
    var poolData = {
        UserPoolId : 'us-east-2_POvycrMmM', // Your user pool id here
        ClientId : '23tcni1j6dbefiibk3ra69f0d2' // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);

    var attributeList = [];

    userPool.signUp(this.state.username, this.state.password, attributeList, null, function(err, result){
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
  }

  confirmUser = () => {
    var poolData = {
        UserPoolId : 'us-east-2_POvycrMmM', // Your user pool id here
        ClientId : '23tcni1j6dbefiibk3ra69f0d2' // Your client id here
    };

    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : this.state.username,
        Pool : userPool
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(this.state.verificationCode, true, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        console.log('call result: ' + result);
    });
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
          <label for="verificationCode">Verification Code</label>
          <input type="text" id="verificationCode" placeholder="123456" value={this.state.verificationCode} onChange={this.inputUpdate}></input>
        </form>
        <button onClick={this.signIn}>Sign In</button>
        <button onClick={this.signUp}>Sign Up</button>
        <button onClick={this.confirmUser}>Confirm</button>
      </React.Fragment>
    )
  }
}

export default App;
