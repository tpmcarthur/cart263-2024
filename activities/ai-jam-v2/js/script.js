/**
Aurora Interplay V1 
Taylor McArthur

ml5js, ai, visuals, interactive experience
*/

"use strict";

//Global Variables
let stars = []; // array to store stars
const numStars = 500; //How many stars are stored

let video; // video input
let poseNet; //using poseNet ml5
let poses = []; // store detected poses in global variables

//Use multiple colors for people, currenylu have two, can add more in setup
let colors;

function setup() {
    createCanvas(windowWidth, windowHeight);

    //Colours for people here, can add more in array
    colors = [
        color(0, 255, 255), //cyan person 1
        color(255, 0, 255), //fuschia person 2
    ];

    //Load Stars to have random pos and sizes
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(2, 7), //size of the stars
            dx: random(-1, 1), // horizontal velocity 
            dy: random(-1, 1) //vertical velocity 
        });
    }

    //video input 
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    //poseNet
    poseNet = ml5.poseNet(video, () => console.log('Model Loaded')); // new poseNet method
    poseNet.on('pose', gotPoses); // listen for new  pose events
}

//New Poses detected 
function gotPoses(results) {
    poses = results; // store array with latest/updates detections, can detect multiple people
}

function draw() {
    background(0, 0, 27);

    createStars(); //stars animated
    createLinesToStars(); //lines from detected poses to stars 

    // image(video, 0, 0, width, height); // can comment out to block to not display over stars
}

function createStars() {
    stars.forEach(star => {
        noStroke();
        fill(255); // star color
        ellipse(star.x, star.y, star.size, star.size);

        //Position of stars with velocity
        star.x += star.dx;
        star.y += star.dy;

        //check for the edges of the screen, change direction 
        if (star.x < 0 || star.x > width) star.dx *= -1;
        if (star.y < 0 || star.y > height) star.dy *= -1;
    });
}

//Draw lines from detected poses to the stars
function createLinesToStars() {
    strokeWeight(3); // thickness of lines

    poses.forEach((pose, index) => {
        pose.pose.keypoints.forEach(keypoint => {
            //can change confidence score to increase more lines? was 0.2 before
            if (keypoint.score > 0.1) {
                const { x, y } = keypoint.position // am I missing a, b from skeleton in poseNet ref to be more accurate??
                createNearestLine(x, y, index); // lines to nearest stars
            }
        });
    });
}

//Secondary more dense option, also works keypoints to nearest stars
function createNearestLine(keyX, keyY, colorIndex) {
    const maxDistance = 200; // value for to connect to further stars 
    let starsWithinRange = []; // array to store three nearest stars, instead of just one above and below 

    //find stars within the max dist
    stars.forEach(star => {
        const verticalDistance = abs(keyY - star.y);
        if (verticalDistance < maxDistance) {
            starsWithinRange.push({ star: star, distance: verticalDistance });
        }
    });

    //Find stars and sort by dist from keypoint
    starsWithinRange.sort((a, b) => a.distance - b.distance);

    //Draw lines to stars within the range 
    starsWithinRange.forEach(item => {
        let star = item.star;
        stroke(colors[colorIndex % colors.length]); // use colour based on index
        line(keyX, keyY, keyX, star.y); // vertical lines, can change to horizontal
    });
}
