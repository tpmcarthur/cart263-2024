/**
Northern Lights 
Taylor McArthur

ml5js, ai, visuals
*/

"use strict";
//Global Variables

let stars = []; // array to store "stars"
const numStars = 250; //How many stars are stored

let video;
let poseNet;
let poses = []; // store detected poses in global variables


function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //Load Stars
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(2, 7), //size of the stars
            dx: random(-1, 1),
            dy: random(-1, 1)
        });
    }

    //video input 
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded); // new poseNet method
    poseNet.on('pose', gotPoses); // listen for new  pose events
}

function gotPoses(results) {
    // console.log(results);
    poses = results; // store array 
}

//When the model is loaded
function modelLoaded() {
    console.log('Model Loaded');
}

function draw() {
    background(0);

    createStars();
    createSkeleton();

    // image(video, 0, 0, width, height); // can comment out to block to not display over stars
}

function createStars() {
    stars.forEach(star => {
        ellipse(star.x, star.y, star.size, star.size);

        //Position of stars
        star.x += star.dx;
        star.y += star.dy;

        //check for the edges of the screen, change direction 
        if (star.x < 0 || star.x > width) {
            star.dx *= -1;
        }

        if (star.y < 0 || star.y > height) {
            star.dy *= -1;
        }
    });
}

// function createSkeleton() {
//     stroke(255, 255, 255); // line colour, white for now
//     strokeWeight(1); // line thickness

//     //going through all they key points
//     poses.forEach(pose => {
//         pose.pose.keypoints.forEach(keypoint => {
//             //use keypoints wirh high confidence score
//             if (keypoint.score > 0.2) {
//                 let nearestStars = null;
//                 let shortestDistance = height; // start with a large num

//                 const { x, y } = keypoint.position

//                 //Look for the nearest star vertically
//                 stars.forEach(stars => {
//                     //calculate verticale distance to each star
//                     let distance = abs(y - stars.y);
//                     if (distance < shortestDistance) {
//                         shortestDistance = distance;
//                         nearestStars = stars;
//                     }
//                 });


//                 //create verticle lines from the keypoints to the nearest stars
//                 if (nearestStars) {
//                     line(x, y, x, nearestStars.y);
//                 }
//             }

//         });

//     });
// }

function createSkeleton() {
    stroke(255, 0, 0); // line colours
    strokeWeight(10); // line thickness

    poses.forEach((poseData) => {
        if (poseData.pose) {
            poseData.pose.keypoints.forEach(keypoint => {
                if (keypoint.score > 0.2) { //confidence score, use high only
                    const { x, y } = keypoint.position;

                    //Variables for tracking stars above and below
                    let nearestStarAbove = null;
                    let nearestStarBelow = null;
                    let distanceStarUp = Infinity;
                    let distanceStarDown = Infinity;

                    //for loop, check through all the stars to find nearest A/B
                    stars.forEach(star => {
                        const distance = y - star.y;

                        //check to see if a star is above keypoint body 
                        if (distance > 0 && distance < distanceStarUp) {
                            nearestStarAbove = star;
                            distanceStarUp = distance;
                        }

                        //check to see if star is below 
                        else if (distance < 0 && -distance < distanceStarDown) {
                            nearestStarBelow = star;
                            distanceStarDown = -distance;
                        }
                    });

                    // create lines to connect 
                    if (nearestStarAbove) {
                        line(x, y, x, nearestStarAbove.y);
                    }
                    //create line to the nearest star below if it exists
                    if (nearestStarBelow) {
                        line(x, y, x, nearestStarBelow.y);
                    }

                }
            });

        }

    });

}

