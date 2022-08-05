
import React, { useEffect } from "react";
import studying from './images/studying.jpg';

import "./styles.css";
import { useState } from 'react';
import Axios from 'axios'

var UserPlace;
var Userpfp;
const top3 = [];
const pfps = [];
var Loading = 0;


function LeaderBoardGen() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    Axios.get('https://hci-final-server.herokuapp.com/leaderboard').then((response) => {
      setLeaderboard(response.data);
    });
  }, []);

  //Reset starting position to 0 on every load
  UserPlace=0;
  //Generates the leaderboard 
  return ([
    
    
    <div class = "TopText">Global Top Scorers</div>
,


    leaderboard.map((val) => {

      
        
    
      {Loading=1}
      {UserPlace++}
      {Userpfp = "https://avatars.dicebear.com/api/adventurer/" + val.fname + val.lname + ".png"}
      pfps.push(Userpfp);


      {if (UserPlace<4){
        top3.push(val);
      }

      if (UserPlace==3){
        return([
          <div class="container">
            <div class="row">
            <div class ="background2nd">
              <div class="col-sm">
              <div class = "leaderboardText">2nd</div>
                <img class="top3pfp" src={pfps[1]}/>        
                <div class="leadnames">{top3[1].fname} {top3[1].lname}</div>
                <div class = "points">{top3[1].points} points</div>
              </div>
            </div>

            <div class="background1st">
              <div class="col-sm">
                <div class = "leaderboardText">1st</div>
                <img class="top3pfp" src={pfps[0]}/>        
                <div class="leadnames">{top3[0].fname} {top3[0].lname}</div>
                <div class = "points">{top3[0].points} points</div>
              </div>
            </div>

            <div class="background3rd">
            <div class="col-sm">
                <div class = "leaderboardText">3rd</div>
                <img class="top3pfp" src={pfps[2]}/>        
                <div class="leadnames">{top3[2].fname} {top3[2].lname}</div>
                <div class = "points">{top3[2].points} points</div>
              </div>
            </div>

            </div>
          </div>
,
        <div class="container">
              <div class="row">
    
                  <div class="col-1">
                    <div class="centertable">
                      Place
                    </div>
                  </div>
    
                  <div class="col-3">
                    
                  </div>
    
                  <div class="col">
                    <div class="centertable">
                      User
                    </div>
                  </div>
    
                  <div class="col">
                    <div class="centertable">
                      Points
                    </div>
                  </div>
                  
            </div>
          </div>
        ]

          );
      }


      }


      {if (UserPlace>3){
          return (    [
          
             
            <div class="container">
            <div class ="backgroundGrey">
              <div class="row">
    
                  <div class="col-1">
                    <div class="centertable">
                      {UserPlace}
                    </div>
                  </div>
    
                  <div class="col-3">
                    <a class="imgcircle" href="#">
                      <img src={Userpfp}/>
                    </a>
                  </div>
    
                  <div class="col">
                    <div class="centertable">
                      {val.fname} {val.lname}
                    </div>
                  </div>
    
                  <div class="col">
                    <div class="centertable">
                      {val.points}
                    </div>
                  </div>
                  
              </div>
            </div>
          </div>
          
          
  ]);
      }
    }
      
      
    })

  
  ]);
}



function Home(){
  return (
    [
    LeaderBoardGen()
    ]
  );

}

export default Home;