import React from "react";

import '../App.css';
import { useState } from 'react';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Signup() {

  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const navigate = useNavigate();

  const displayInfo = () => {
    console.log(fName + lName + username);
  }

  const addUser = () => {
    Axios.post('https://hci-final-server.herokuapp.com/create', {
      fName: fName,
      lName: lName,
      username: username,
      password: password
    }).then((response) => {
      if (response.data.message) {
        setSignupStatus(response.data.message)
      } else {
        setSignupStatus("ok");
        navigate('/authenticate')
      }
      console.log(response)
    });
  };

  return (
    <div className="App">
      <div className="Info">

        <head>
          <title> Login Form </title>
        </head>
        <body>
          <div class="loginbox">

            <h1>Sign up</h1>
            <form>
              <p>First Name:</p>
              <input type="text"
                onChange={(event) => {
                  setfName(event.target.value)
                }}
              />
              <p>Last Name:</p>

              <input type="text"
                onChange={(event) => {
                  setlName(event.target.value)
                }}
              />

              <p>Username:</p>

              <input type="text"
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
              />

              <p>Password:</p>

              <input type="password"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
              <br></br>
              <br></br>
              <input type="button" onClick={addUser} name="" value="Create Account"></input>

            </form>

          </div>
        </body>

      </div>
      <h2>{signupStatus}</h2>
    </div>
  );
}

export default Signup;