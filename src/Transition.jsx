//this component is called between the Training phase and the Test phase. 
//it asks participants how difficult they found the game, and briefly introduces
//the test phase


import { useState } from 'react';
import Likert from 'react-likert-scale';
import { likertChoicesEase } from './likertScale';
import { textStyle, buttonStyle } from './dimensions';
import Data from './Data';



const Transition = (props) => {
    //keeps track of which page we are on
    const [ transitionTrial, setTransitionTrial ] = useState(0);
    //a list of the pages for the transition
    const transitionTrialsList = [
        <TransitionOne setTransitionTrial={setTransitionTrial}/>,
        <TransitionTwo setCurrentPhase={props.setCurrentPhase} />
    ];
    //display the current page
    return(
        transitionTrialsList[transitionTrial]
    )
    
    
}

//a question about the game difficulty
const TransitionOne = (props) => {
    //keeps track of the latest likert response
    const [ response, setResponse ] = useState(0);
    //parameters for the likert scale
    const likertOptions =  {
        question: "",
        responses: likertChoicesEase,
        //updates the participant's response
        onChange: val => {
            setResponse(val.value);
        },
        id: 'question',
    };

    //when the participant clicks to go to the next page,
    //record his response
    const handleClick = () => {
        Data.difficulty.push({
            "difficulty": response
        })
        props.setTransitionTrial((a)=>a+1);
    }
    //display the question
    return(
        <div style={textStyle}>
        <p>You have now played the game ten times</p>
        <p>How difficult is it to win the game?</p>
        <Likert {...likertOptions} />
        <br></br>
        <button style={buttonStyle} onClick={()=>handleClick()}>click to continue</button>
        </div>
        
    )
}

//briefly introduces the test phase
const TransitionTwo = (props) => {
    return(
        <div style={textStyle}>
            <p>Another player called Joe played the same game.</p>
            <p>In the rest of the study, we will show you the outcome of a round of the game that Joe played, and we will ask you some questions about it
                </p>
            <button style={buttonStyle} onClick={()=>{props.setCurrentPhase("test")}}>click to continue</button>
        </div>
    )
    
}

export default Transition;