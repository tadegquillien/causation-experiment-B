//this component generates one urn. It is used during the Training phase.
//the urn has a button next to it, which is used by the participant to 
//draw a ball from the urn. When the urn is generated, it is already determined
//which ball will be drawn from the urn.


import React, { useState, useRef } from 'react';
import {
  ball_size, margin, r, urnHeight, svgHeight, urnWidth, svgWidth, y_start,
  ball_pos, urn_style
} from './dimensions';
import { shuffle } from './convenienceFunctions';
import { color_palette } from './gameParameters'


const GenerateUrn = ({ ids, urnColorID, urnLetter, prob, drawn,
  scoreSetter, setUrnCounter, phase, ballColors }) => {
  //the number of points associated with the ball we draw
  let power = drawn;
  //retrieve the color associated with the ball we draw
  drawn = drawn > 0 ? color_palette[urnColorID - 1] : "black";
  //this variable determined the color of the placeholder for the drawn ball
  //(it is white before we draw a ball, and then takes the color of the drawn ball)
  const [drawnColor, setDrawnColor] = useState(phase === "training" ? "white" :
    phase === "instructions" ? "white" :
    phase === "test" ? drawn : null);
  //have we clicked on the "draw" button yet?
  const [clicked, setClicked] = useState(false);
  //the "draw" button. It disappears once we click on it
  const [drawButton, setDrawButton] = useState(
    <text border="black" stroke="black" cursor="pointer" fontSize={ball_size / 2}
      onClick={() => handleClick(drawn, power)} x={3 * ball_size} y={y_start - 2 * ball_size}>Draw</text>);
  //the letter displayed next to the urn
  const letter = phase === "instructions" ? null : <text border="black" stroke="black" cursor="default" fontSize={ball_size / 2}
    x={3 * ball_size} y={y_start - 4 * ball_size}>{urnLetter}</text>

 
  //when we click on the "draw" button, dispay the ball, make the button disappear,
  //update the score, and increment the counter
  //keeping track of how many urns from drawn from
  const handleClick = (drawn, power) => {
    if (!clicked) {
      scoreSetter((a) => a + power);
      setUrnCounter((a) => a + 1);
    };

    setDrawnColor(drawn);
    setClicked(true);
    setDrawButton(null);
  }

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
        {drawButton}
      </svg>
    </span>
  )
}



export default GenerateUrn;