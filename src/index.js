//the main page

//the experiment has the following structure:

//-consent form
//-instructions
//-training phase: the participant plays ten rounds of the game, in order
//  to get familiar with the game
//-transition
//-test phase: the participant observes the outcome of a round of the game
//  played by a fictitious player, and answers questions about the causal strength
//  of the colored balls drawn by that player
//-demographics
//-end

import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConsentForm from './ConsentForm';
import TrainingPhase from './TrainingPhase';
import TestPhase from './TestPhase';
import Instructions from './Instructions';
import Transition from './Transition';
import Demographics from './Demographics';
import { ballColorsList, shuffledUrnIds } from './randomizedParameters';
import { textStyle } from './dimensions';
import { shuffle } from './convenienceFunctions';
import { urn_ids, actualWorld, validationCode } from './gameParameters';

import reportWebVitals from './reportWebVitals';



const Root = () => {
  //keeps track of the current phase
  const [currentPhase, setCurrentPhase] = useState("consentForm");
  //keeps track of the current trial, for the Training phase
  const [trialNumber, setTrialNumber] = useState(1);
  //keeps track of the current trial, for the Test phase
  const [testNumber, setTestNumber] = useState(0);

  //increment the trial number, in the Training phase
  const increment = (integer) => setTrialNumber(integer + 1);
  //increment the trial number, in the Test phase
  const incrementTest = (integer) => setTestNumber(integer + 1);

  //a list of IDs of the trials for the Training phase
  //const trial_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //const trial_ids = [1,2,3,4,5,6,7,8,9,10];
  const trial_ids = [1,2,3,4,5,6,7,8,9,10];
  //generate the trials of the Training phase
  const trials = trial_ids.map((i) => {
    return <TrainingPhase key={i} increment={increment} trial={trialNumber}
      phase={currentPhase} trial_ids={trial_ids} shuffledUrnIds={shuffledUrnIds}
      ballColorsList={ballColorsList} setCurrentPhase={setCurrentPhase}/>
  })

  //a list of the urns about which we will ask causal questions,
  //arranged in the order in which we will ask the questions during the Test phase
  //i.e. if the array is [3,1,7] it means we will ask about the causal strength
  //of urn 3, then urn 1, then urn 7 (note that the urn ID is not the same as the position of
  //the urn on the screen)
  const test_ids = useRef(shuffle(
    urn_ids.map((i) => {
      if (actualWorld[i - 1]) { return i }
    }).filter((a) => a > 0)
  )).current;


//generate the trials of the Test phase
  var tests = test_ids.map((i) => {
    return (
      <TestPhase key={i} incrementTest={incrementTest}
        test_ids={test_ids} phase={currentPhase} testNumber={testNumber}
        ballColorsList={ballColorsList} shuffledUrnIds={shuffledUrnIds}
      />
    )
  })

//add a page at the beginning of the Test phase which will
//display instructions
  tests.unshift(
    <TestPhase key={0} incrementTest={incrementTest}
      test_ids={test_ids} phase={currentPhase} testNumber={testNumber}
      ballColorsList={ballColorsList} shuffledUrnIds={shuffledUrnIds}
    />
  )

    //the end of the study
    const ending = 
    <div style={textStyle}>Thank you for your participation!
    <br></br>
    Please click on this link to go back to Prolific: <a href="https://app.prolific.co/submissions/complete?cc=113C348D">https://app.prolific.co/submissions/complete?cc=113C348D.</a>
    <br></br>
    After you have clicked the link, you can then close the present tab.</div>;
    
    //the structure of the study:
    //this code displays a page, in function of the current phase,
    //and of the trial number within that phase
  return (
    currentPhase === "consentForm" ? <ConsentForm setCurrentPhase={setCurrentPhase}/> :
      currentPhase === "instructions" ? <Instructions
        setCurrentPhase={setCurrentPhase} test_ids={test_ids} shuffledUrnIds={shuffledUrnIds} /> :
        currentPhase === "training" ? (trialNumber > trial_ids.length ? setCurrentPhase("transition") : trials[trialNumber - 1]) :
          currentPhase === "transition" ? <Transition setCurrentPhase={setCurrentPhase} /> :
            currentPhase === "test" ? (testNumber > test_ids.length ? setCurrentPhase("demographics") : tests[testNumber]) :
              currentPhase === "demographics" ? <Demographics setCurrentPhase={setCurrentPhase} /> :
                currentPhase === "ending" ? ending :
                  <p>{currentPhase}</p>
  )
}

//display the experiment
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// }