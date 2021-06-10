//manages the page for the test phase
//this component is called 1+N times, where N is the number of
//colored balls that the fictitious player draws
//the first time is a simple instructions message
//all other N times, the participant is asked about the
//causal strength of one colored ball that was drawn

import React, { useState, useRef } from 'react';
import Likert from 'react-likert-scale';
import './TestPhase.css';
import TestImage from './TestImage';
import Data from './Data';
import { likertChoicesTest } from './likertScale';
import { urn_letters } from './gameParameters';
import { buttonStyle } from './dimensions';

import {
    circle_ids, color_palette, mode, urn_ids, PROBS, colors, actualWorld,
    threshold
} from './gameParameters'



const TestPhase = (props) => {
    
    //keeps track of the participant's response to the causal question
    const [response, setResponse] = useState("unclicked");

    //the score of the fictitious player
    const score = actualWorld.reduce((a, b) => a + b, 0);
   
    //the ID of the urn that the current question is about
    const urnID = props.test_ids[props.testNumber - 1];
    //the letter displayed next to that urn
    const questionLetter = urn_letters[props.shuffledUrnIds.indexOf(urnID)];
    //determines whether the fictitious player won or lost the game (by default, he wins the game)
    const outcome = score >= threshold ? "The player won" : "The player lost";
    
    //when the participant clicks on the likert scale, a button appears that allows one to go
    //to the next trial
    const nextTrialButton = (response > 0) ? <button style={buttonStyle}
    onClick={() => handleClick()}>
        NEXT {'>'}{'>'}</button> : null;
    //when the participant clicks to go to the next page, 
    //record his response, and go to the next trial
    const handleClick = () => {
        Data.responses.push(
            {
                //the test number (e.g. 1 if this was the first question asked)
                trial: props.testNumber,
                //the letter displayed next to the urn
                letter: questionLetter,
                //the participant's response (our main DV)
                response: response,
                //the urn ID (this is the one that matters most for data analysis)
                urnID: urnID
            }
        );
        props.incrementTest(props.testNumber);      
    }
    
    //the likert scale
    const likertOptions =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponse(val.value);
        },
        id: 'question',
    };
    
    //the question 
    const causalQuestion = <span className="causalQuestion">
       
        <h3 text-align="center">Please tell us how much you agree with the following statement:</h3>
        <h3 text-align="center">Joe won because he drew a colored ball from box {questionLetter}</h3>
        <div style={{marginLeft:"80vw"}}>{nextTrialButton}</div>
        <div style={{marginLeft:"20vw", marginRight:"20vw"}}><Likert {...likertOptions} /></div>
        
        
        
    </span>

    const introductionStyle =  {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginLeft: "20vw",
            marginRight: "20vw",
            }
    
    //this text is displayed at the beginning of the phase, before the first trial
    const introduction = <div style={{backgroundColor: "lightgrey"}}>
        <div style={introductionStyle}>
        <h3>
            Below you can see the outcome of the round that Joe played. <br></br>
            Joe drew {props.test_ids.length} colored balls, and he got {score} points, so he won the game. <br></br>
            Please take a moment to look at the boxes, and at the balls that Joe drew.<br></br> 
            In the next pages, you will see the same picture, and we will ask you some questions about why he won the game.
        </h3>
        <button style={buttonStyle}
    onClick={() => handleClick()}>
        click to continue</button>
        <br></br>
        </div>;
    </div>

    //if this is the beginning of the phase, display the introduction, otherwise
    //display the causal question
    const probe = props.testNumber > 0 ? causalQuestion : introduction;
    
    //display the urns
    const img = <TestImage ballColorsList = {props.ballColorsList} phase={props.phase} 
    testNumber={props.testNumber} test_ids={props.test_ids} shuffledUrnIds={props.shuffledUrnIds}/>;

    return (
        <span className="metaContainer">
            {probe}
            <span className="containerTest">
                <div className="scoreboardTest">
                    <h1>number of points required to win: {threshold}</h1><br></br>
                    <h1>Player's score: <span style={{color:"#03D310"}}>{score}</span></h1><br></br>
                    <h1>{outcome}</h1>
                </div>
                <div className="urnsTest" >{img}</div>
                
            </span>
            
        </span>
        
        

    )

}


export default TestPhase;

