/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const speechSynth = new p5.Speech();

let showSubtitle = false;
let toSay = `Hallo, meine name is Taylor, Ich comme aus Canada. Ich bin 30 yahre alt!`;

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Synth settings

    speechSynth.setPitch(1);
    speechSynth.setRate(1);
    speechSynth.setVoice(`Google Deutsch`);

    speechSynth.onStart = speechStarted;
    speechSynth.onEnd = speechEnded;

    console.log(speechSynth.listVoices());
}

function draw() {
    background(227, 127, 111)

    if (showSubtitle) {
        textSize(30);
        text(toSay, 100, 100);
    }

}

function mousePressed() {
    // Say something 
    speechSynth.speak(toSay);
}

function speechStarted() {
    showSubtitle = true;
}

function speechEnded() {
    showSubtitle = false;
}