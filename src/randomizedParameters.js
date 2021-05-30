//these elements are randomly generated at the start of the experiment
//after being generated, they keep the same value throughout the experiment

import { shuffle } from './convenienceFunctions';
import { circle_ids, color_palette, mode, urn_ids, urn_letters, PROBS, colors, actualWorld, 
    threshold } from './gameParameters'

//randomly generates a list of the position of the colored balls within an urn,
//for each urn
export const ballColorsList = 
    //cycle through all urns
    urn_ids.map((a)=>{
    let prob = PROBS[a-1];
    let urnColorID = colors[a-1];
    //cycle through all balls
    let ballColors = circle_ids.map((i) => {
        //fill the urn with N colored balls, then 10-N black balls
        let number = prob * 10;
        let urnColor = color_palette[urnColorID - 1];
        let color = i < number ? urnColor : "black";
        return color;
      });
      //shuffle the urn
      ballColors = shuffle(ballColors);

      return ballColors

});

//randomize the order in which the urns are presented on the screen
//(applies to both the Training phase and Test phase)
export const shuffledUrnIds = shuffle(urn_ids);
    

