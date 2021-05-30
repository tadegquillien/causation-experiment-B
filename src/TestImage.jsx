//this displays all urns, during the Test phase


import GenerateDeterministicUrn from './GenerateDeterministicUrn';
import {
    circle_ids, color_palette, mode, urn_ids, urn_letters, PROBS, colors, actualWorld,
    threshold
} from './gameParameters'



const TestImage = (props) => {
    //this variable is used to determine the letter to display next to an urn
    let letterCounter = 0;
    //cycle through each urn, and display that urn
    const img = props.shuffledUrnIds.map((i) => {
        //determine the letter to display next to the urn
        let chosenLetter = urn_letters[letterCounter];
        letterCounter = letterCounter+1;
        //display the urn
        return (
            <GenerateDeterministicUrn ids={circle_ids} urnColorID={colors[i - 1]} urnLetter={chosenLetter}
                drawn={actualWorld[i - 1]}
                ballColors={props.ballColorsList[i - 1]}
                phase={props.phase}
                testNumber={props.testNumber} 
                test_ids={props.test_ids}
                shuffledUrnIds={props.shuffledUrnIds}
                />
        )
    }
    )

    return img
}

export default TestImage;