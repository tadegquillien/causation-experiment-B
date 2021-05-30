import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';




const shuffle = (unshuffled) => {
  const new_array = unshuffled.map((a) => ({sort: Math.random(), value: a}))
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


  const BigComponent = () => {

  const [ score, setScore ] = useState(0);
  const [ urnCounter, setUrnCounter ] = useState(0);
  const mode = "probabilistic";
  const color_palette = ["#F0F3A7", "#F5CC6E", "#F77B25", "#F81203"];
  const urn_ids = [1,2,3,4,5,6,7,8];
  const PROBS = [.1,.2,.3,.4,.6,.7,.8,.9];
  const colors = [3,2,1,1,1,2,1,4];
  var actualWorld = [1, 0, 0, 0, 1, 0, 1, 1];
  actualWorld = urn_ids.map((i) => {
    let color = colors[i-1];
    let binary = actualWorld[i-1];
    return(color*binary);
  })
  

  

  const possibleWorld = urn_ids.map((i) => {
    let color = colors[i-1];
    let value = Math.random() < PROBS[i-1] ? color : 0;
    return(value);
  })

  const threshold = colors.reduce((a, b) => a + b, 0) / 2;
  
  const outcome = urnCounter > 7 ? (score > threshold ? "The player wins!" : "The player loses") : null;

  
  
  
  

  const Generate_urn = (props) => {
      
      const [ drawnColor, setDrawnColor ] = useState("white");
      const [ clicked, setClicked ] = useState(false);
      
      const handleClick = (drawn, power) => {
        if(!clicked){
          setScore((a)=>a+power);
          setUrnCounter((a)=>a+1);
          if(urnCounter==8){alert("all filled!")}
        };
        
        setDrawnColor(drawn);
        setClicked(true);
      }
    

      let circleArray = props.ids;
      let urnColorID = props.colors;
      let prob = props.prob;
      let drawn = props.drawn > 0 ? color_palette[urnColorID-1] : "black";
      let power = props.drawn;


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

    return(
      
        <svg width="300" height="300"  id={"id"} onClick={()=> handleClick(drawn, power)}>
        <rect style={urn_style} ></rect>
      {circles}
      <circle cx="150" cy="200" r={r} fill={drawnColor} stroke="black" />
      </svg>
      
      )
  }
  


  
  
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



  const Image = () => {
   return urn_ids.map((i) => {
      let world = mode === "predetermined" ? actualWorld : possibleWorld;
      return(
      <Generate_urn ids={circle_ids} colors={colors[i-1]} prob={PROBS[i-1]} drawn={world[i-1]}/>
      )}
      )
}

  return(
    <span className="container">

      <div className="scoreboard">
      <p>score: {score}</p><br></br>
      <p>number of points required to win: {threshold}</p><br></br>
      <p>{outcome}</p>
      </div>
      <div className="urns">{useRef(<Image />).current}</div>

      
      
    </span>
  )
  
}

ReactDOM.render(
  <React.StrictMode>
    <BigComponent />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// }