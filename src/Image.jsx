//this displays all urns, during the Training phase

import React, { useRef, useState } from 'react';
import GenerateUrn from './GenerateUrn';
import {
    circle_ids, color_palette, mode, urn_ids, urn_letters, PROBS, colors, trainingGames,
    threshold
} from './gameParameters'



const Image = (props) => {

    //determine the set of balls from each urn. By default, we use mode="predetermined" and
    //import this information from props. But there is the option to use mode="probabilistic"
    //to generate these randomly using the possibleWorld variable  
    const [possibleWorld, setPossibleWorld] = useState(urn_ids.map((i) => {
        let color = colors[i - 1];
        let value = Math.random() < PROBS[i - 1] ? color : 0;
        return (value);
    }));

    let world = mode === "predetermined" ? trainingGames[props.trial - 1] : mode === "probabilistic" ?
        possibleWorld : alert("Please enter a valid mode");

    //this variable is used to determine the letter to display next to each urn
    let letterCounter = 0;

    //cycle through each urn in the list and display that urn
    return props.shuffledUrnIds.map((i) => {
        //set the letter to be displayed next to the urn
        let chosenLetter = urn_letters[letterCounter];
        letterCounter = letterCounter + 1;
        //display the urn
        return (
            <GenerateUrn ids={circle_ids} urnColorID={colors[i - 1]} urnLetter={chosenLetter} prob={PROBS[i - 1]} drawn={world[i - 1]}
                scoreSetter={props.scoreSetter} setUrnCounter={props.setUrnCounter} phase={props.phase}
                ballColors={props.ballColorsList[i - 1]} setScoreColor={props.setScoreColor} 
                score={props.score}/>
        )
    }
    )
}

export default Image;