//various parameters defining the size and style of things

//the size of a ball, including the surrounding margin. 
//(formally, ball_size = 2*(ball_radius + margin))
//many other variables depend on it, such that
//changing this parameter re-scales the entire urn
export const ball_size = 26;

//how much space there is between a ball and the edge of the urn
export const margin = ball_size / 10;
//the radius of a ball
export const r = (ball_size / 2) - margin;
//the height of an urn
export const urnHeight = (ball_size) * 5 + margin * 2;
//the height of the svg that contains an urn
export const svgHeight = 1.5 * urnHeight;
//the width of an urn
export const urnWidth = (ball_size + margin) * 2;
//the width of the svg that contains an urn
export const svgWidth = 2 * urnWidth;
//the coordinate of the lowest ball
export const y_start = svgHeight - 2 * ball_size;

//the coordinates of all balls in an urn
export const ball_pos = {
    xCoords: [ball_size, ball_size + ball_size],
    yCoords: [y_start, y_start - ball_size, y_start - 2 * ball_size, y_start - 3 * ball_size, y_start - 4 * ball_size]
}

//the css for an urn
export const urn_style =
{
    x: ball_size - (ball_size / 2 + margin),
    y: y_start + (ball_size / 2) - (ball_size) * 5 - margin,
    strokeWidth: "3",
    stroke: "black",
    fill: "white",
    height: urnHeight,
    width: urnWidth
};

//a css used widely, to center text and stimuli
export const textStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    minHeight: "100vh",
    marginLeft: "20vw",
    marginRight: "20vw",
    fontSize: "20px",
}

//the css for buttons
export const buttonStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "24px",
    cursor: 'pointer',
  };