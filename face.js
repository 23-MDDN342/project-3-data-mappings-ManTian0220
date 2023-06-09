/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 7;

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
  this.facecolour = 2;
  this.eyecolour = 2;
  this.curvecolour = 2;
  this.holdercolour = 2;
  this.num_eyes = 2;    
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.eyebrowColour = [0]
  this.noseColour = [216, 122, 245]
  this.purple = [150, 35, 250]
  this.pink = [235,103,217]
  this.black = [0]
  this.blue = [128,187,242]
  this.grey = [192,201,209]
  this.yellow = [245, 209, 66]
  this.white = [255]
  this.brown = [145, 65, 15]

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    // console.log()

    //cup holder
    if(this.holdercolour == 2) {
    this.cupholder = segment_average(positions.top_lip);
    push()
    stroke(this.white);
    strokeWeight(0.3);
    noFill();
    rect(this.cupholder[0]-0.6,this.cupholder[1]-2,4, 2, 0.1,4)
    pop()
    }else{
      this.cupholder = segment_average(positions.top_lip);
      push()
      stroke(this.black);
      strokeWeight(0.3);
      noFill();
      rect(this.cupholder[0]-0.6,this.cupholder[1]-2,4, 2, 0.1,4)
      pop()
    }

    // head
    if(this.facecolour == 2) {
    //head pink
    rectMode(CENTER);
    noStroke();
    fill(this.pink);
    rect(segment_average(positions.chin)[0], 0, 4, 4,0.5,0.5,20,20);

        push()
        stroke(this.pink)
        strokeWeight(0.6)
        line(positions.chin[4][0],positions.chin[8][1],positions.chin[12][0], positions.chin[8][1])
        pop()
    }else{
      //head purple
      rectMode(CENTER);
      noStroke();
      fill(this.purple);
      rect(segment_average(positions.chin)[0], 0, 4, 4,0.5,0.5,20,20);

              push()
              stroke(this.purple)
              strokeWeight(0.6)
              line(positions.chin[4][0],positions.chin[8][1],positions.chin[12][0], positions.chin[8][1])
              pop()
    }

    //nose
    let nose_t = segment_average(positions.nose_tip);  
    push()
    angleMode(DEGREES);
    scale(0.8);
    fill(this.noseColour);
    stroke(this.noseColour);
    ellipse(nose_t[0], nose_t[1]-0.3,0.9,0.9);
      triangle(positions.nose_tip[0][0],positions.nose_bridge[2][1],positions.nose_tip[2][0],  positions.nose_bridge[0][1],positions.nose_tip[4][0],positions.nose_bridge[2][1]);
    pop()
    
    // mouth
    if(this.mouth_size == 2){

    fill(this.white);
    rect(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.2 * this.mouth_size,4);

    push()
    fill(this.grey);
   
    noStroke()
    
    rect(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.05 * this.mouth_size,4); // ------- 
    scale(0.4);
    stroke(this.grey)
    strokeWeight(0.2)

    line((positions.top_lip[10][0])-0.5,(positions.top_lip[10][1])+1.75,(positions.top_lip[10][0])-0.5, (positions.top_lip[10][1])+1.2)
    line((positions.top_lip[10][0])+1,(positions.top_lip[10][1])+1.75, (positions.top_lip[10][0])+1, (positions.top_lip[10][1])+1.2)
    //this.draw_segment(positions.top_lip)
    pop()

    }else{
      push()
      fill(this.white);
    rect(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size,4);
    pop()

  }

    // eyes
    this.eyeballColour
    if(this.eyecolour > 50){
      this.eyeballColour = this.blue;
    }else{
      this.eyeballColour = this.black;
    }

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);
    noStroke();
    let curEyeShift = 0.04 * this.eye_shift;
      let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
      fill(this.white);
      ellipse(left_eye_pos[0], left_eye_pos[1], 1, 1);
      ellipse(right_eye_pos[0], right_eye_pos[1], 1, 1);
      fill(this.eyeballColour);
      ellipse(eyePosX - 0.65 + curEyeShift, left_eye_pos[1], 0.5, 0.5);
      ellipse(eyePosX + 0.8 + curEyeShift, right_eye_pos[1], 0.5, 0.5);
      
       // eyebrows
   let left_eyebrow_pos = segment_average(positions.left_eyebrow);
   let right_eyebrow_pos = segment_average(positions.right_eyebrow);

        fill( this.eyebrowColour);
        stroke( this.eyebrowColour);
        strokeWeight(0.1);
        rect(left_eyebrow_pos[0],left_eyebrow_pos[1], 2, 0.6, 0.1,4);
        rect(right_eyebrow_pos[0],right_eyebrow_pos[1], 2, 0.6, 0.1,4);


//curve
this.hotdrinkcolour
if(this.curvecolour > 50){
  this.hotdrinkcolour = this.brown ;
}else{
  this.hotdrinkcolour = this.yellow ;
}

if(this.num_eyes == 2) {
push()
noFill();
stroke(this.hotdrinkcolour);
beginShape()
curveVertex(nose_t[0], nose_t[1]-3)
curveVertex(nose_t[0], nose_t[1]-3)
curveVertex(nose_t[0]-0.5, nose_t[1]-3.5)
curveVertex(nose_t[0], nose_t[1]-4)
curveVertex(nose_t[0], nose_t[1]-4.5)
curveVertex(nose_t[0], nose_t[1]-5)
endShape()

beginShape()
curveVertex(nose_t[0]+1, nose_t[1]-3)
curveVertex(nose_t[0]+1, nose_t[1]-3)
curveVertex(nose_t[0]+0.5, nose_t[1]-3.5)
curveVertex(nose_t[0]+1, nose_t[1]-4)
curveVertex(nose_t[0]+1, nose_t[1]-4.5)
curveVertex(nose_t[0]+1, nose_t[1]-5)
endShape()

beginShape()
curveVertex(nose_t[0]+0.5, nose_t[1]-3)
curveVertex(nose_t[0]+0.5, nose_t[1]-3)
curveVertex(nose_t[0], nose_t[1]-3.5)
curveVertex(nose_t[0]+0.5, nose_t[1]-4)
curveVertex(nose_t[0]+0.5, nose_t[1]-4.5)
curveVertex(nose_t[0]+0.5, nose_t[1]-5)
endShape()
pop()
}
}

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    this.eye_shift = map(settings[1], 0, 100, -2, 2);
    this.mouth_size = int(map(settings[2], 0, 100, 1, 2));
    this.facecolour = int(map(settings[3], 0, 100, 1, 2));
    this.eyecolour = map(settings[4], 0, 100, 0, 100);
    this.curvecolour = map(settings[5], 0, 100, 0, 100);
    this.holdercolour = int(map(settings[6], 0, 100, 1, 2));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(6);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 1, 2, 0, 100);
    settings[3] = map(this.facecolour, 1, 2, 0, 100);
    settings[4] = map(this.eyecolour, 0, 100, 0, 100);
    settings[5] = map(this.curvecolour, 0, 100, 0, 100);
    settings[6] = map(this.holdercolour, 1, 2, 0, 100);
    return settings;
  }
}
