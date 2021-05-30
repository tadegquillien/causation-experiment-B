//this component generates one urn. It is used during the Test phase.


import React, { useState, useRef } from 'react';
import {
    ball_size, margin, r, urnHeight, svgHeight, urnWidth, svgWidth, y_start,
    ball_pos, urn_style
} from './dimensions';
import { shuffle } from './convenienceFunctions';
import { color_palette, urn_letters } from './gameParameters'


const GenerateDeterministicUrn = ({ ids, urnColorID, urnLetter, drawn,
    phase, ballColors, testNumber, test_ids, shuffledUrnIds }) => {
    //the ID of the urn (does not depend on the urn's screen position)
    const urnID = test_ids[testNumber - 1];
    //the letter of the urn that the current question is about
    const questionLetter = urn_letters[shuffledUrnIds.indexOf(urnID)];
    //if the urn is the focus of the current question, surround it with a green border
    const borderColor = urnLetter === questionLetter ? "green" : "white";
    //the number of points associated with the drawn ball
    let power = drawn;
    //retrieve the color of the ball that was drawn
    drawn = drawn > 0 ? color_palette[urnColorID - 1] : "black";
    const [drawnColor, setDrawnColor] = useState(phase === "training" ? "white" :
        phase === "test" ? drawn :
            phase === "instructions" ? drawn :
                null);
    

    //the letter displayed next to the urn (does depend on the urn's screen position)
    const letter = phase === "instructions" ? null : <text border="black" stroke="black" cursor="default" fontSize={ball_size / 2}
        x={3 * ball_size} y={y_start - 4 * ball_size}>{urnLetter}</text>




    //draw the balls
    let circles = ids.map((i) => {
        let x = i % 2;
        let y = Math.floor(i / 2);
        let color = ballColors[i];
        return (

            <circle
                cx={ball_pos.xCoords[x]} cy={ball_pos.yCoords[y]} r={r} fill={color}
            />
        )
    })

    //display the urn
    return (
        <span>
            <svg width={svgWidth} height={svgHeight} id={"id"} >

                <rect style={urn_style} ></rect>
                {circles}
                <circle cx={3.5 * ball_size} cy={y_start} r={r} fill={drawnColor} stroke="black" />
                {letter}
                <rect width={svgWidth} height={svgHeight} stroke={borderColor}
                    strokeWidth="4px" fill="none"></rect>

            </svg>
        </span>
    )
}



export default GenerateDeterministicUrn;