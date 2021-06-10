//manages the page during the Training phase

import React, { useState, useEffect } from 'react';
import Image from './Image';
import './TrainingPhase.css';
import Data from './Data';

import { buttonStyle } from './dimensions';
import { circle_ids, color_palette, mode, urn_ids, PROBS, colors, actualWorld, 
threshold } from './gameParameters';


  
const TrainingPhase = (props) => {
    //the current trial number
    const trial = props.trial;
    //keep track of the score
    const [ score, setScore ] = useState(0);
    //keep track of how many urns we have already drawn from
    const [ urnCounter, setUrnCounter ] = useState(0);

    const [scoreColor, setScoreColor ] = useState("black");
    //increments the score
    const scoreSetter = (a) => {
        setScore(a);
    };
    //when the participant has drawn from all urns, determines if they win or lose
    const outcome = urnCounter > (urn_ids.length - 1) ? 
    (score >= threshold ? "you win!" : "You lose") : null;
    //the button to go to the next round. Only appears after all urns have been drawn from
    const buttonText = trial < props.trial_ids.length ? "click to go to the next round" :
     "click to go to the next phase";
    const nextTrialButton = urnCounter > (urn_ids.length - 1) ? <button style={{...buttonStyle, marginLeft:"0"}} onClick={() => handleClick()}>
        {buttonText}</button> : null;

    const devSkip = <button onClick={()=>props.setCurrentPhase("transition")}>Dev:Skip</button>;

    //when we click on the "next round" button, increment the 'trial' variable and record the score in the Data
    const handleClick = ()=>{
        props.increment(trial);
        Data.scores.push(score);
    }
    
    useEffect(() => {
      if(score >= threshold){setScoreColor("#03D310")};
    }, [score]);

    //display the urns and the scoreboard
    return(
      <span className = "superContainer">
      <span className="container">

        <div className="currentScore">
        <h1>Current score: <span style={{color: scoreColor}}>{score}</span></h1><br></br>
        </div>


        {/*the urns*/}
        <div className="urns"><Image ids={circle_ids} colors={colors} prob={PROBS} 
       score={score} scoreSetter={scoreSetter} setUrnCounter={setUrnCounter} mode={mode}
       phase={props.phase} shuffledUrnIds={props.shuffledUrnIds}
       ballColorsList={props.ballColorsList} trial={trial} setScoreColor={setScoreColor}/></div>

        {/*the scoreboard*/}
        <div className="requiredScore">
        <h1>number of points required to win: {threshold}</h1><br></br>
        </div>
        
        
        
       
        
      </span>
      <div className="side">
        <h1>this is round #{trial}</h1>
        <h1>{outcome}</h1>
        {nextTrialButton}
        {devSkip}
      </div>
      </span>
    )
    
  }
  

  export default TrainingPhase;

  