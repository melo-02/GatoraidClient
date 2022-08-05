import React, { useEffect } from "react";
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [isLoading, setLoading] = React.useState(true);
    const [loggedUser, setLoggedUser] = useState("");
    const [userPoints, setUserPoints] = useState("");
    const navigate = useNavigate();

    Axios.defaults.withCredentials = true; // Allows cookie values to be set from a different domain

    const logOutUser = () => {
        Axios.post('https://hci-final-server.herokuapp.com/logout', {}).then((response) => {
            console.log(response);
            if (response.data == "Logout successful") {
                navigate('/authenticate')
            }
        });
    };

    useEffect(() => { // Runs every time we refresh our page
        Axios.get("https://hci-final-server.herokuapp.com/auth").then((response) => {
            if (response.data.loggedIn === true) {
                setLoggedUser(response.data.user[0].username);
                // points don't update after taking quiz
                // setUserPoints(response.data.user[0].points);
            } else {
                navigate('/authenticate/')
            }
        });
    }, [])

    useEffect(() => {
        console.log(loggedUser);
        const url = 'https://hci-final-server.herokuapp.com/pointCt/' + loggedUser
        console.log(url)
        Axios.get(url).then((response) => {
            console.log(response.data);
            setUserPoints(response.data[0].points);
        });
        setLoading(false);
    }, [loggedUser,])

    if (isLoading) {
        console.log('Loading');
        return <div className="Points">Loading...</div>;
    }

    return (
        <div className="App">
            <h2>Welcome {loggedUser}</h2>
            <h3>Points: {userPoints}</h3>
            <input type="button" onClick={logOutUser} name="" value="Log Out"></input>
        </div>
    );
}

export default Dashboard;