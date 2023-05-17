/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 3;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {
  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = [255];
  this.mainColour = [150, 35, 250];
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.chinColour = [153, 153, 51]
  this.lipColour = [136, 68, 68]
  this.eyebrowColour = [0]
  this.eyeballColour = [0]
  this.noseColour = [216, 122, 245]

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    console.log()
    // head
    rectMode(CENTER);
    stroke(stroke_color);
    fill(this.mainColour);
    rect(segment_average(positions.chin)[0], 0, 4, 4,0.5,0.5,20,20);
    noStroke();

    //nose
    push()
    let nose_pos = segment_average(positions.nose_bridge);
    let nose_length = segment_average(positions.nose_tip);
    angleMode(DEGREES);
    fill(this.noseColour);
    stroke(this.noseColour);
    // this.draw_segment(positions.nose_bridge);
    // this.draw_segment(positions.nose_tip);
    arc(nose_pos, nose_pos,nose_length,1,0,180)
    pop()

    // mouth
    fill(this.detailColour);
    rect(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size,4,4,4,4);
    // draw the chin segment using points

    // fill(this.chinColour);
    // stroke(this.chinColour);
    // this.draw_segment(positions.chin);

    // strokeWeight(0.03);

    // fill(this.lipColour);
    // stroke(this.lipColour);
    // this.draw_segment(positions.top_lip);
    // this.draw_segment(positions.bottom_lip);

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    // eyes
    noStroke();
    let curEyeShift = 0.04 * this.eye_shift;
    if(this.num_eyes == 2) {
      fill(this.detailColour);
      ellipse(left_eye_pos[0], left_eye_pos[1], 1, 1);
      ellipse(right_eye_pos[0], right_eye_pos[1], 1, 1);
      fill(this.eyeballColour);
      ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, 0.5);
      ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, 0.5);

      // fill(this.mainColour);
      // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
      // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
    }
    else {
      let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
      let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

      fill(this.detailColour);
      ellipse(eyePosX, eyePosY, 1, 1);

      fill(this.eyeballColour);
      ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.5);
    }
   // fill(0)
   //ellipse(0,0, 0.5,0.5) center point
   //rect(-2,-2,4.5,4) sizing debug 
   let left_eyebrow_pos = segment_average(positions.left_eyebrow);
   let right_eyebrow_pos = segment_average(positions.right_eyebrow);
       // eyebrows
       if(this.num_eyes == 2) {
        fill( this.eyebrowColour);
        stroke( this.eyebrowColour);
        strokeWeight(0.1);
        // this.draw_segment(positions.left_eyebrow);
        // this.draw_segment(positions.right_eyebrow);
        rect(left_eyebrow_pos[0],left_eyebrow_pos[1], 2, 0.6, 0.1,4,4,4,4);
        rect(right_eyebrow_pos[0],right_eyebrow_pos[1], 2, 0.6, 0.1,4,4,4,4);
  
        // fill(this.mainColour);
        // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
        // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
      }
      else {
        let eyebrowPosX = (left_eyebrow_pos[0] + left_eyebrow_pos[0]) / 10;
        let eyebrowPosY = (left_eyebrow_pos[1] + left_eyebrow_pos[1]) / 2;
  
        fill( this.eyebrowColour);
        stroke( this.eyebrowColour);
        strokeWeight(0.1);
        // this.draw_segment(positions.left_eyebrow);
        // this.draw_segment(positions.right_eyebrow);
        rect(eyebrowPosX,eyebrowPosY, 2, 0.6, 0.1,4,4,4,4);
        rect(eyebrowPosX,eyebrowPosY, 2, 0.6, 0.1,4,4,4,4);
      }
  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    this.eye_shift = map(settings[1], 0, 100, -2, 2);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 2);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 2, 0, 100);
    return settings;
  }
}
