/**
Voice 4 | Input Experiments
Taylor McArthur 


*/

"use strict";

const speechRecognizer = new p5.SpeechRec();
let backgroundColour = `black`;

function preload() {

}

function setup() {
    createCanvas(500, 500);

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.continous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.start();

}

function draw() {
    background(backgroundColour);

}

function handleSpeechInput() {
    let words = speechRecognizer.resultString.split(``);
    backgroundColour = words.pop();

    // backgroundColour = speechRecognizer.resultString;
    // if (speechRecognizer.resultString.toLowerCase() === `turn the lights on`) {
    //     lightsAreOn = true;
    // }

    // else if (speechRecognizer.resultString.toLowerCase() === `turn the lights off`) {
    //     lightsAreOn = false;
    // }
}