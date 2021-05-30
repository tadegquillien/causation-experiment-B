import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const shuffle = (unshuffled) => {
  let new_array = unshuffled.map((a) => ({sort: Math.random(), value: a}))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);
  return new_array;

}
  

const ball_size = 40;
  const margin = ball_size / 10;
  const r=(ball_size/2)-margin;
  const ball_pos = {
    xCoords: [50, 50+ball_size],
    yCoords: [200, 200-ball_size, 200-2*ball_size, 200-3*ball_size, 200-4*ball_size]
  }

  const circle_ids = [0,1,2,3,4,5,6,7,8,9];
  //const colors = ["#CDCEF1", "#8A8DF1", "#4E53F2", "#030AF3"];
  //const colors = ["#c9daf8", "#6d9eeb", "#1155cc", "#052e54"];


const UrnMaker = () => {

  
  const mode = "probabilistic";
  const color_palette = ["#F0F3A7", "#F5CC6E", "#F77B25", "#F81203"];
  const urn_ids = [1,2,3,4,5,6,7,8];
  const probs = [.1,.2,.3,.4,.6,.7,.8,.9];
  const colors = [3,2,1,1,1,2,1,4];
  var actualWorld = [1, 0, 0, 0, 1, 0, 1, 1];
  actualWorld = urn_ids.map((i) => {
    let color = colors[i-1];
    let binary = actualWorld[i-1];
    return(color*binary);
  })
  

  

  const possibleWorld = urn_ids.map((i) => {
    let color = colors[i-1];
    let value = Math.random() < probs[i-1] ? color : 0;
    return(value);
  })

  const threshold = colors.reduce((a, b) => a + b, 0) / 2;
  const score = mode === "predetermined" ? actualWorld.reduce((a,b) => a+b, 0) : possibleWorld.reduce((a, b) => a + b, 0);
  const win = score > threshold ? "The player wins!" : "The player loses";

  const [ dummy, setDummy ] = useState(0);

  const Draw = (props) => {
    
    return(<svg>
      <circle cx="150" cy="200" r={r} fill={props.color} stroke="black" />
    </svg>)
  }
  

  const Generate_urn = (circleArray, urnColorID, prob) => {
      let ballColors = circleArray.map((i) => {
        let number = prob * 10;
        let urnColor = color_palette[urnColorID-1]
        let color = i < number ? urnColor : "black";
        return color;
      }
      )

      

      ballColors = useRef(shuffle(ballColors)).current;
      let circles = circleArray.map((i) => {
        let x = i%2;
        let y = Math.floor(i/2);
        let color = ballColors[i];
        return(
        
         <circle
          cx={ball_pos.xCoords[x]} cy={ball_pos.yCoords[y]} r={r} fill={color} 
          />
          
      
      )
    })
    return(circles)
  }
  
  
  const urnContents = urn_ids.map((i)=>{
    return(Generate_urn(circle_ids, colors[i-1], probs[i-1]));
  })

  
  const urn_style = 
    {
      x:50-(ball_size/2 + margin),
      y:200+(ball_size/2) - (ball_size)*5 - margin,
      strokeWidth:"3",
      stroke:"black",
      fill: "white",
      height: (ball_size)*5 + margin * 2,
      width: (ball_size+margin)*2
    };



  const image = () => urn_ids.map((i) => {

    let coloredBall = color_palette[colors[i-1]-1];
    let color = "";
    if (mode == "predetermined"){
     color = actualWorld[i-1] > 0 ? coloredBall : "black";
    }else{
      color = possibleWorld[i-1] > 0 ? coloredBall : "black";}

    return(
      
        <svg height="300" width="300" id={i} onClick={() => setDummy(1)} >
        <rect style={urn_style} ></rect>
        {urnContents[i-1]}
        <Draw color={color}/>
        
        </svg>
      
    )
  })
  
  
  const urns = image();
//
  

  
  return(
    <div>
      <p>
        The score is: {score}  .
      The minimum number of points to win was: {dummy}{threshold}  .
      {win}</p>
      {urns}
    </div>
    
  )
}



ReactDOM.render(
  <React.StrictMode>
    <UrnMaker />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// }