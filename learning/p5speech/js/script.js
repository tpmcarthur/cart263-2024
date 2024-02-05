/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Speech object 
let speechRecognizer = new p5.SpeechRec();


/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
    // tell program the function to call if the recognizer hears something 
    speechRecognizer.onResult = handleResult;
    // tell the recognizer to start listening
    speechRecognizer.start();
}


/**
Description of draw()
*/
function draw() {

}

// called when the recognizer is heard
function handleResult() {
    // checks if there is a result
    if (speechRecognizer.resultValue === true) {
        console.log(speechRecognizer.resultString);
    }
}